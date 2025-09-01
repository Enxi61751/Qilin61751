import { Provide } from '@midwayjs/core';
import { InjectDataSource } from '@midwayjs/typeorm';
import { DataSource, Repository, Like, Between, MoreThanOrEqual, LessThanOrEqual } from 'typeorm';
import { Activity } from './entities/activity.entity';
import { ActivityRegistration } from './entities/activity-registration.entity';
import { ActivityComment } from './entities/activity-comment.entity';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { QueryActivityDto } from './dto/query-activity.dto';
import { CreateRegistrationDto } from './dto/create-registration.dto';
import { CreateCommentDto } from './dto/create-comment.dto';

@Provide()
export class ActivityService {
  @InjectDataSource()
  dataSource: DataSource;

  get activityRepository(): Repository<Activity> {
    return this.dataSource.getRepository(Activity);
  }

  get registrationRepository(): Repository<ActivityRegistration> {
    return this.dataSource.getRepository(ActivityRegistration);
  }

  get commentRepository(): Repository<ActivityComment> {
    return this.dataSource.getRepository(ActivityComment);
  }

  /**
   * 创建活动
   */
  async create(createActivityDto: CreateActivityDto, organizerId: number): Promise<Activity> {
    const activity = this.activityRepository.create({
      ...createActivityDto,
      organizerId,
      currentParticipants: 0
    });

    return await this.activityRepository.save(activity);
  }

  /**
   * 查找所有活动（支持搜索和筛选）
   */
  async findAll(queryDto: QueryActivityDto): Promise<{ activities: Activity[]; total: number }> {
    const {
      keyword,
      type,
      location,
      status,
      startDate,
      endDate,
      minPrice,
      maxPrice,
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'DESC'
    } = queryDto;

    const queryBuilder = this.activityRepository.createQueryBuilder('activity')
      .leftJoinAndSelect('activity.organizer', 'organizer')
      .select([
        'activity.id',
        'activity.title',
        'activity.description',
        'activity.type',
        'activity.location',
        'activity.maxParticipants',
        'activity.currentParticipants',
        'activity.price',
        'activity.startTime',
        'activity.endTime',
        'activity.status',
        'activity.isActive',
        'activity.requirements',
        'activity.images',
        'activity.createdAt',
        'activity.updatedAt',
        'organizer.id',
        'organizer.username',
        'organizer.nickname',
        'organizer.avatar'
      ]);

    // 关键词搜索
    if (keyword) {
      queryBuilder.andWhere(
        '(activity.title LIKE :keyword OR activity.description LIKE :keyword OR activity.location LIKE :keyword)',
        { keyword: `%${keyword}%` }
      );
    }

    // 类型筛选
    if (type) {
      queryBuilder.andWhere('activity.type = :type', { type });
    }

    // 地点筛选
    if (location) {
      queryBuilder.andWhere('activity.location LIKE :location', { location: `%${location}%` });
    }

    // 状态筛选
    if (status) {
      queryBuilder.andWhere('activity.status = :status', { status });
    }

    // 日期范围筛选
    if (startDate && endDate) {
      queryBuilder.andWhere('activity.startTime BETWEEN :startDate AND :endDate', { startDate, endDate });
    }

    // 价格范围筛选
    if (minPrice !== undefined && maxPrice !== undefined) {
      queryBuilder.andWhere('activity.price BETWEEN :minPrice AND :maxPrice', { minPrice, maxPrice });
    } else if (minPrice !== undefined) {
      queryBuilder.andWhere('activity.price >= :minPrice', { minPrice });
    } else if (maxPrice !== undefined) {
      queryBuilder.andWhere('activity.price <= :maxPrice', { maxPrice });
    }

    // 只显示激活的活动
    queryBuilder.andWhere('activity.isActive = :isActive', { isActive: true });

    // 排序
    queryBuilder.orderBy(`activity.${sortBy}`, sortOrder as 'ASC' | 'DESC');

    // 分页
    const skip = (page - 1) * limit;
    queryBuilder.skip(skip).take(limit);

    const [activities, total] = await queryBuilder.getManyAndCount();

    return { activities, total };
  }

  /**
   * 根据ID查找活动
   */
  async findOne(id: number): Promise<Activity> {
    const activity = await this.activityRepository.findOne({
      where: { id },
      relations: ['organizer']
    });

    if (!activity) {
      throw new Error('活动不存在');
    }

    return activity;
  }

  /**
   * 更新活动
   */
  async update(id: number, updateActivityDto: UpdateActivityDto): Promise<Activity> {
    const activity = await this.findOne(id);
    await this.activityRepository.update(id, updateActivityDto);
    return await this.findOne(id);
  }

  /**
   * 删除活动
   */
  async remove(id: number): Promise<void> {
    const activity = await this.findOne(id);
    await this.activityRepository.remove(activity);
  }

  /**
   * 活动报名
   */
  async register(createRegistrationDto: CreateRegistrationDto): Promise<ActivityRegistration> {
    const { activityId, userId, additionalInfo } = createRegistrationDto;

    // 检查活动是否存在
    const activity = await this.findOne(activityId);
    if (!activity.isActive) {
      throw new Error('活动已关闭');
    }

    // 检查是否已报名
    const existingRegistration = await this.registrationRepository.findOne({
      where: { activityId, userId }
    });

    if (existingRegistration) {
      throw new Error('您已经报名过此活动');
    }

    // 检查是否还有名额
    if (activity.currentParticipants >= activity.maxParticipants) {
      throw new Error('活动名额已满');
    }

    // 创建报名记录
    const registration = this.registrationRepository.create({
      activityId,
      userId,
      paidAmount: activity.price,
      additionalInfo
    });

    const savedRegistration = await this.registrationRepository.save(registration);

    // 更新活动参与人数
    await this.activityRepository.update(activityId, {
      currentParticipants: activity.currentParticipants + 1
    });

    return savedRegistration;
  }

  /**
   * 取消报名
   */
  async cancelRegistration(activityId: number, userId: number, reason?: string): Promise<void> {
    const registration = await this.registrationRepository.findOne({
      where: { activityId, userId }
    });

    if (!registration) {
      throw new Error('未找到报名记录');
    }

    if (registration.status === 'cancelled') {
      throw new Error('报名已取消');
    }

    await this.registrationRepository.update(registration.id, {
      status: 'cancelled',
      cancelReason: reason
    });

    // 更新活动参与人数
    const activity = await this.findOne(activityId);
    await this.activityRepository.update(activityId, {
      currentParticipants: Math.max(0, activity.currentParticipants - 1)
    });
  }

  /**
   * 获取用户的活动报名列表
   */
  async getUserRegistrations(userId: number): Promise<ActivityRegistration[]> {
    return await this.registrationRepository.find({
      where: { userId },
      relations: ['activity', 'activity.organizer'],
      order: { createdAt: 'DESC' }
    });
  }

  /**
   * 获取活动的报名列表
   */
  async getActivityRegistrations(activityId: number): Promise<ActivityRegistration[]> {
    return await this.registrationRepository.find({
      where: { activityId },
      relations: ['user'],
      order: { createdAt: 'ASC' }
    });
  }

  /**
   * 创建评论
   */
  async createComment(createCommentDto: CreateCommentDto): Promise<ActivityComment> {
    const { activityId, userId } = createCommentDto;

    // 检查活动是否存在
    await this.findOne(activityId);

    // 检查用户是否参加过此活动
    const registration = await this.registrationRepository.findOne({
      where: { activityId, userId, status: 'completed' }
    });

    if (!registration) {
      throw new Error('只有参加过活动的用户才能评论');
    }

    const comment = this.commentRepository.create(createCommentDto);
    return await this.commentRepository.save(comment);
  }

  /**
   * 获取活动评论列表
   */
  async getActivityComments(activityId: number, page: number = 1, limit: number = 10): Promise<{ comments: ActivityComment[]; total: number }> {
    const [comments, total] = await this.commentRepository.findAndCount({
      where: { activityId, isVisible: true },
      relations: ['user'],
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit
    });

    return { comments, total };
  }

  /**
   * 删除评论
   */
  async deleteComment(commentId: number, userId: number): Promise<void> {
    const comment = await this.commentRepository.findOne({
      where: { id: commentId }
    });

    if (!comment) {
      throw new Error('评论不存在');
    }

    if (comment.userId !== userId) {
      throw new Error('只能删除自己的评论');
    }

    await this.commentRepository.remove(comment);
  }
} 