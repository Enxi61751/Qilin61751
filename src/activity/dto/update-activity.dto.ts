import { Rule, RuleType } from '@midwayjs/validate';

export class UpdateActivityDto {
  @Rule(RuleType.string().optional().min(2).max(100))
  title?: string;

  @Rule(RuleType.string().optional().min(10))
  description?: string;

  @Rule(RuleType.string().optional())
  type?: string;

  @Rule(RuleType.string().optional())
  location?: string;

  @Rule(RuleType.number().optional().min(1).max(100))
  maxParticipants?: number;

  @Rule(RuleType.number().optional().min(0))
  price?: number;

  @Rule(RuleType.date().optional())
  startTime?: Date;

  @Rule(RuleType.date().optional())
  endTime?: Date;

  @Rule(RuleType.string().optional())
  status?: string;

  @Rule(RuleType.boolean().optional())
  isActive?: boolean;

  @Rule(RuleType.object().optional())
  requirements?: {
    ageRange?: string;
    skillLevel?: string;
    equipment?: string[];
  };

  @Rule(RuleType.array().optional())
  images?: string[];
} 