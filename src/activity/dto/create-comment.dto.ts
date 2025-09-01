import { Rule, RuleType } from '@midwayjs/validate';

export class CreateCommentDto {
  @Rule(RuleType.number().required())
  activityId: number;

  @Rule(RuleType.number().required())
  userId: number;

  @Rule(RuleType.string().required().min(1).max(1000))
  content: string;

  @Rule(RuleType.number().optional().min(1).max(5))
  rating?: number;

  @Rule(RuleType.number().optional())
  replyTo?: number;

  @Rule(RuleType.array().optional())
  images?: string[];
} 