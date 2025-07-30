import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Facility {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string; // 场地名称 (篮球场/羽毛球场等)

  @Column()
  type: string; // 场地类型

  @Column()
  capacity: number; // 容纳人数

  @Column({ default: true })
  isAvailable: boolean; // 是否可用

  @Column('jsonb', { nullable: true })
  openingHours: { start: string; end: string }[]; // 开放时间
}