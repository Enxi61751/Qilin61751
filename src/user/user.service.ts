import { Provide} from '@midwayjs/core';
import { InjectDataSource } from '@midwayjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Provide()
export class UserService {
  @InjectDataSource()
  dataSource: DataSource;

  get userRepository(): Repository<User> {
    return this.dataSource.getRepository(User);
  }

  /**
   * 创建用户
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    // 检查用户名是否已存在
    const existingUser = await this.userRepository.findOne({
      where: [
        { username: createUserDto.username },
        { email: createUserDto.email },
        { phone: createUserDto.phone }
      ]
    });

    if (existingUser) {
      throw new Error('用户名、邮箱或手机号已存在');
    }

    // 加密密码
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword
    });

    return await this.userRepository.save(user);
  }

  /**
   * 查找所有用户
   */
  async findAll(): Promise<User[]> {
    return await this.userRepository.find({
      select: ['id', 'username', 'email', 'phone', 'nickname', 'avatar', 'isActive', 'isAdmin', 'createdAt']
    });
  }

  /**
   * 根据ID查找用户
   */
  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      select: ['id', 'username', 'email', 'phone', 'nickname', 'avatar', 'isActive', 'isAdmin', 'profile', 'createdAt', 'updatedAt']
    });

    if (!user) {
      throw new Error('用户不存在');
    }

    return user;
  }

  /**
   * 根据用户名查找用户
   */
  async findByUsername(username: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { username }
    });
  }

  /**
   * 根据邮箱查找用户
   */
  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { email }
    });
  }

  /**
   * 更新用户
   */
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);

    // 如果要更新用户名、邮箱或手机号，需要检查是否重复
    if (updateUserDto.username || updateUserDto.email || updateUserDto.phone) {
      const existingUser = await this.userRepository.findOne({
        where: [
          { username: updateUserDto.username || user.username },
          { email: updateUserDto.email || user.email },
          { phone: updateUserDto.phone || user.phone }
        ]
      });

      if (existingUser && existingUser.id !== id) {
        throw new Error('用户名、邮箱或手机号已存在');
      }
    }

    // 如果要更新密码，需要加密
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    await this.userRepository.update(id, updateUserDto);
    return await this.findOne(id);
  }

  /**
   * 删除用户
   */
  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
  }

  /**
   * 验证用户密码
   */
  async validatePassword(user: User, password: string): Promise<boolean> {
    return await bcrypt.compare(password, user.password);
  }

  /**
   * 分页查询用户
   */
  async findWithPagination(page: number = 1, limit: number = 10): Promise<{ users: User[]; total: number }> {
    const [users, total] = await this.userRepository.findAndCount({
      select: ['id', 'username', 'email', 'phone', 'nickname', 'avatar', 'isActive', 'isAdmin', 'createdAt'],
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' }
    });

    return { users, total };
  }
}

