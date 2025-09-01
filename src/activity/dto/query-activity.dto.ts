import { Rule, RuleType } from '@midwayjs/validate';

export class QueryActivityDto {
  @Rule(RuleType.string().optional())
  keyword?: string; // 搜索关键词

  @Rule(RuleType.string().optional())
  type?: string; // 活动类型

  @Rule(RuleType.string().optional())
  location?: string; // 活动地点

  @Rule(RuleType.string().optional())
  status?: string; // 活动状态

  @Rule(RuleType.date().optional())
  startDate?: Date; // 开始日期

  @Rule(RuleType.date().optional())
  endDate?: Date; // 结束日期

  @Rule(RuleType.number().optional().min(0))
  minPrice?: number; // 最低价格

  @Rule(RuleType.number().optional().min(0))
  maxPrice?: number; // 最高价格

  @Rule(RuleType.number().optional().min(1))
  page?: number; // 页码

  @Rule(RuleType.number().optional().min(1).max(50))
  limit?: number; // 每页数量

  @Rule(RuleType.string().optional())
  sortBy?: string; // 排序字段

  @Rule(RuleType.string().optional().valid('ASC', 'DESC'))
  sortOrder?: string; // 排序方向
} 