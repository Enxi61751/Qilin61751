import { Rule, RuleType } from '@midwayjs/validate';

export class CreateRegistrationDto {
  @Rule(RuleType.number().required())
  activityId: number;

  @Rule(RuleType.number().required())
  userId: number;

  @Rule(RuleType.object().optional())
  additionalInfo?: {
    emergencyContact?: string;
    specialRequirements?: string;
    teamPreference?: string;
  };
} 