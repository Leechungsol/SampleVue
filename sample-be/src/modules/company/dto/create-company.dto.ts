import { ApiPropertyOptional } from "@nestjs/swagger";

export class CreateCompanyDto {
  @ApiPropertyOptional({ maxLength: 50 })
  compName: string;

  @ApiPropertyOptional()
  isBuyType: boolean;

  @ApiPropertyOptional()
  isSaleType: boolean;

  @ApiPropertyOptional()
  isDueType: boolean;

  @ApiPropertyOptional()
  isOtherType: boolean;

  @ApiPropertyOptional({ maxLength: 15 })
  compNo: string;

  @ApiPropertyOptional({ maxLength: 50 })
  ceoName: string;

  @ApiPropertyOptional({ maxLength: 20 })
  ceoPhone: string;

  @ApiPropertyOptional({ maxLength: 500 })
  compAddress: string;

  @ApiPropertyOptional({ maxLength: 50 })
  bizConditions: string;

  @ApiPropertyOptional({ maxLength: 50 })
  bizType: string;

  @ApiPropertyOptional({ maxLength: 20 })
  compPhone: string;

  @ApiPropertyOptional({ maxLength: 20 })
  faxNo: string;

  @ApiPropertyOptional({ maxLength: 50 })
  email: string;

  @ApiPropertyOptional({ maxLength: 50 })
  chargeName: string;

  @ApiPropertyOptional({ maxLength: 20 })
  chargePhone: string;

  @ApiPropertyOptional({ maxLength: 50 })
  bankName: string;

  @ApiPropertyOptional({ maxLength: 20 })
  accountNo: string;

  @ApiPropertyOptional({ maxLength: 50 })
  depositor: string;

  @ApiPropertyOptional({ maxLength: 500 })
  other1: string;

  @ApiPropertyOptional({ maxLength: 500 })
  other2: string;

  @ApiPropertyOptional({ maxLength: 500 })
  other3: string;

  @ApiPropertyOptional({ maxLength: 500 })
  other4: string;

  @ApiPropertyOptional({ maxLength: 500 })
  other5: string;

  @ApiPropertyOptional()
  isDelete: boolean;

  @ApiPropertyOptional({ maxLength: 30 })
  loginId: string;

  @ApiPropertyOptional({ maxLength: 30 })
  password: string;

  @ApiPropertyOptional({ maxLength: 500 })
  descr: string;
}
