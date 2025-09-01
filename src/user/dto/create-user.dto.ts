import { Rule, RuleType } from '@midwayjs/validate';

export class CreateUserDto {
  @Rule(RuleType.string().required().min(3).max(20))
  username: string;

  @Rule(RuleType.string().required().email())
  email: string;

  @Rule(RuleType.string().required().pattern(/^1[3-9]\d{9}$/))
  phone: string;

  @Rule(RuleType.string().required().min(6).max(20))
  password: string;

  @Rule(RuleType.string().optional().max(50))
  nickname?: string;

  @Rule(RuleType.string().optional().uri())
  avatar?: string;

  @Rule(RuleType.boolean().optional())
  isActive?: boolean;

  @Rule(RuleType.boolean().optional())
  isAdmin?: boolean;

  @Rule(RuleType.object().optional())
  profile?: {
    age?: number;
    gender?: string;
    address?: string;
    bio?: string;
  };
}

