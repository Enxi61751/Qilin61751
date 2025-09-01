import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Activity } from './activity.entity';

@Entity()
export class ActivityRegistration {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Activity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'activityId' })
  activity: Activity; // 关联的活动

  @Column()
  activityId: number; // 活动ID

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User; // 报名的用户

  @Column()
  userId: number; // 用户ID

  @Column({ default: 'pending' })
  status: string; // 报名状态：pending(待确认), confirmed(已确认), cancelled(已取消), completed(已完成)

  @Column('decimal', { precision: 10, scale: 2 })
  paidAmount: number; // 支付金额

  @Column({ default: false })
  isPaid: boolean; // 是否已支付

  @Column({ nullable: true })
  paymentTime: Date; // 支付时间

  @Column({ nullable: true })
  cancelReason: string; // 取消原因

  @Column('jsonb', { nullable: true })
  additionalInfo: {
    emergencyContact?: string;
    specialRequirements?: string;
    teamPreference?: string;
  }; // 额外信息

  @CreateDateColumn()
  createdAt: Date; // 报名时间

  @UpdateDateColumn()
  updatedAt: Date; // 更新时间
} 