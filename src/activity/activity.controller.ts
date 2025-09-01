import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@midwayjs/core';
import { ActivityService } from './activity.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { QueryActivityDto } from './dto/query-activity.dto';
import { CreateRegistrationDto } from './dto/create-registration.dto';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('/api/activities')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  /**
   * 创建活动
   */
  @Post()
  async create(@Body() createActivityDto: CreateActivityDto, @Body('organizerId') organizerId: number) {
    try {
      const activity = await this.activityService.create(createActivityDto, organizerId);
      return {
        code: 200,
        message: '活动创建成功',
        data: activity
      };
    } catch (error) {
      return {
        code: 400,
        message: error.message,
        data: null
      };
    }
  }

  /**
   * 获取活动列表（支持搜索和筛选）
   */
  @Get()
  async findAll(@Query() queryDto: QueryActivityDto) {
    try {
      const result = await this.activityService.findAll(queryDto);
      return {
        code: 200,
        message: '获取活动列表成功',
        data: result
      };
    } catch (error) {
      return {
        code: 400,
        message: error.message,
        data: null
      };
    }
  }

  /**
   * 根据ID获取活动详情
   */
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const activity = await this.activityService.findOne(+id);
      return {
        code: 200,
        message: '获取活动详情成功',
        data: activity
      };
    } catch (error) {
      return {
        code: 404,
        message: error.message,
        data: null
      };
    }
  }

  /**
   * 更新活动
   */
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateActivityDto: UpdateActivityDto) {
    try {
      const activity = await this.activityService.update(+id, updateActivityDto);
      return {
        code: 200,
        message: '活动更新成功',
        data: activity
      };
    } catch (error) {
      return {
        code: 400,
        message: error.message,
        data: null
      };
    }
  }

  /**
   * 删除活动
   */
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.activityService.remove(+id);
      return {
        code: 200,
        message: '活动删除成功',
        data: null
      };
    } catch (error) {
      return {
        code: 400,
        message: error.message,
        data: null
      };
    }
  }

  /**
   * 活动报名
   */
  @Post(':id/register')
  async register(@Param('id') activityId: string, @Body() createRegistrationDto: CreateRegistrationDto) {
    try {
      const registration = await this.activityService.register({
        ...createRegistrationDto,
        activityId: +activityId
      });
      return {
        code: 200,
        message: '活动报名成功',
        data: registration
      };
    } catch (error) {
      return {
        code: 400,
        message: error.message,
        data: null
      };
    }
  }

  /**
   * 取消报名
   */
  @Post(':id/cancel-registration')
  async cancelRegistration(
    @Param('id') activityId: string,
    @Body('userId') userId: number,
    @Body('reason') reason?: string
  ) {
    try {
      await this.activityService.cancelRegistration(+activityId, userId, reason);
      return {
        code: 200,
        message: '取消报名成功',
        data: null
      };
    } catch (error) {
      return {
        code: 400,
        message: error.message,
        data: null
      };
    }
  }

  /**
   * 获取用户的活动报名列表
   */
  @Get('user/:userId/registrations')
  async getUserRegistrations(@Param('userId') userId: string) {
    try {
      const registrations = await this.activityService.getUserRegistrations(+userId);
      return {
        code: 200,
        message: '获取用户报名列表成功',
        data: registrations
      };
    } catch (error) {
      return {
        code: 400,
        message: error.message,
        data: null
      };
    }
  }

  /**
   * 获取活动的报名列表
   */
  @Get(':id/registrations')
  async getActivityRegistrations(@Param('id') activityId: string) {
    try {
      const registrations = await this.activityService.getActivityRegistrations(+activityId);
      return {
        code: 200,
        message: '获取活动报名列表成功',
        data: registrations
      };
    } catch (error) {
      return {
        code: 400,
        message: error.message,
        data: null
      };
    }
  }

  /**
   * 创建活动评论
   */
  @Post(':id/comments')
  async createComment(@Param('id') activityId: string, @Body() createCommentDto: CreateCommentDto) {
    try {
      const comment = await this.activityService.createComment({
        ...createCommentDto,
        activityId: +activityId
      });
      return {
        code: 200,
        message: '评论创建成功',
        data: comment
      };
    } catch (error) {
      return {
        code: 400,
        message: error.message,
        data: null
      };
    }
  }

  /**
   * 获取活动评论列表
   */
  @Get(':id/comments')
  async getActivityComments(
    @Param('id') activityId: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10
  ) {
    try {
      const result = await this.activityService.getActivityComments(+activityId, page, limit);
      return {
        code: 200,
        message: '获取活动评论成功',
        data: result
      };
    } catch (error) {
      return {
        code: 400,
        message: error.message,
        data: null
      };
    }
  }

  /**
   * 删除评论
   */
  @Delete('comments/:commentId')
  async deleteComment(@Param('commentId') commentId: string, @Body('userId') userId: number) {
    try {
      await this.activityService.deleteComment(+commentId, userId);
      return {
        code: 200,
        message: '评论删除成功',
        data: null
      };
    } catch (error) {
      return {
        code: 400,
        message: error.message,
        data: null
      };
    }
  }
} 