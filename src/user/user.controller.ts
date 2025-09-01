import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@midwayjs/core';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('/api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * 创建用户
   */
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.userService.create(createUserDto);
      return {
        code: 200,
        message: '用户创建成功',
        data: user
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
   * 获取所有用户（分页）
   */
  @Get()
  async findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    try {
      const result = await this.userService.findWithPagination(page, limit);
      return {
        code: 200,
        message: '获取用户列表成功',
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
   * 根据ID获取用户
   */
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const user = await this.userService.findOne(+id);
      return {
        code: 200,
        message: '获取用户信息成功',
        data: user
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
   * 更新用户
   */
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userService.update(+id, updateUserDto);
      return {
        code: 200,
        message: '用户更新成功',
        data: user
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
   * 删除用户
   */
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.userService.remove(+id);
      return {
        code: 200,
        message: '用户删除成功',
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
