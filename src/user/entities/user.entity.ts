import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string; // 用户名

  @Column({ unique: true })
  email: string; // 邮箱

  @Column({ unique: true })
  phone: string; // 手机号

  @Column()
  password: string; // 密码（加密存储）

  @Column({ nullable: true })
  nickname: string; // 昵称

  @Column({ nullable: true })
  avatar: string; // 头像URL

  @Column({ default: true })
  isActive: boolean; // 是否激活

  @Column({ default: false })
  isAdmin: boolean; // 是否管理员

  @Column('jsonb', { nullable: true })
  profile: {
    age?: number;
    gender?: string;
    address?: string;
    bio?: string;
  }; // 用户资料

  @CreateDateColumn()
  createdAt: Date; // 创建时间

  @UpdateDateColumn()
  updatedAt: Date; // 更新时间
}

