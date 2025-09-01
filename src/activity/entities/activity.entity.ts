import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Activity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string; // 活动标题

  @Column('text')
  description: string; // 活动描述

  @Column()
  type: string; // 活动类型（篮球、足球、羽毛球等）

  @Column()
  location: string; // 活动地点

  @Column()
  maxParticipants: number; // 最大参与人数

  @Column()
  currentParticipants: number; // 当前参与人数

  @Column('decimal', { precision: 10, scale: 2 })
  price: number; // 活动费用

  @Column()
  startTime: Date; // 开始时间

  @Column()
  endTime: Date; // 结束时间

  @Column({ default: 'upcoming' })
  status: string; // 活动状态：upcoming(即将开始), ongoing(进行中), completed(已结束), cancelled(已取消)

  @Column({ default: true })
  isActive: boolean; // 是否激活

  @Column('jsonb', { nullable: true })
  requirements: {
    ageRange?: string;
    skillLevel?: string;
    equipment?: string[];
  }; // 参与要求

  @Column('jsonb', { nullable: true })
  images: string[]; // 活动图片

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'organizerId' })
  organizer: User; // 组织者

  @Column()
  organizerId: number; // 组织者ID

  @CreateDateColumn()
  createdAt: Date; // 创建时间

  @UpdateDateColumn()
  updatedAt: Date; // 更新时间
} 