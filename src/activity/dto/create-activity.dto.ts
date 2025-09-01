import { Rule, RuleType } from '@midwayjs/validate';

export class CreateActivityDto {
  @Rule(RuleType.string().required().min(2).max(100))
  title: string;

  @Rule(RuleType.string().required().min(10))
  description: string;

  @Rule(RuleType.string().required())
  type: string;

  @Rule(RuleType.string().required())
  location: string;

  @Rule(RuleType.number().required().min(1).max(100))
  maxParticipants: number;

  @Rule(RuleType.number().required().min(0))
  price: number;

  @Rule(RuleType.date().required())
  startTime: Date;

  @Rule(RuleType.date().required())
  endTime: Date;

  @Rule(RuleType.object().optional())
  requirements?: {
    ageRange?: string;
    skillLevel?: string;
    equipment?: string[];
  };

  @Rule(RuleType.array().optional())
  images?: string[];
} 