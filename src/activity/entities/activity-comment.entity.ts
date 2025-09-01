import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Activity } from './activity.entity';

@Entity()
export class ActivityComment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Activity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'activityId' })
  activity: Activity; // 关联的活动

  @Column()
  activityId: number; // 活动ID

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User; // 评论用户

  @Column()
  userId: number; // 用户ID

  @Column('text')
  content: string; // 评论内容

  @Column({ type: 'int', default: 0 })
  rating: number; // 评分（1-5星）

  @Column({ default: true })
  isVisible: boolean; // 是否可见

  @Column({ nullable: true })
  replyTo: number; // 回复的评论ID

  @Column('jsonb', { nullable: true })
  images: string[]; // 评论图片

  @CreateDateColumn()
  createdAt: Date; // 评论时间

  @UpdateDateColumn()
  updatedAt: Date; // 更新时间
} 