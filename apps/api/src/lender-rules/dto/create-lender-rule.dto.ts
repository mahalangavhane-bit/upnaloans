export class CreateLenderRuleDto {
  lenderId: string;

  productId?: string;

  name: string;

  version?: number;

  ruleType: string;

  ruleConfig: Record<string, any>;
}