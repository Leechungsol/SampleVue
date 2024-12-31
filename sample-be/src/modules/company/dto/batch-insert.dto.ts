import { ApiProperty } from "@nestjs/swagger";

export class SingleInsertDto {
  @ApiProperty()
  compKey: number;

  @ApiProperty()
  compName: string | null;

  @ApiProperty()
  isBuyType: boolean | null;

  @ApiProperty()
  isSaleType: boolean | null;

  @ApiProperty()
  isDueType: boolean | null;

  @ApiProperty()
  isOtherType: boolean | null;

  @ApiProperty()
  compNo: string | null;

  @ApiProperty()
  ceoName: string | null;

  @ApiProperty()
  ceoPhone: string | null;

  @ApiProperty()
  compAddress: string | null;

  @ApiProperty()
  bizConditions: string | null;

  @ApiProperty()
  bizType: string | null;

  @ApiProperty()
  compPhone: string | null;

  @ApiProperty()
  faxNo: string | null;

  @ApiProperty()
  email: string | null;

  @ApiProperty()
  chargeName: string | null;

  @ApiProperty()
  chargePhone: string | null;

  @ApiProperty()
  bankName: string | null;

  @ApiProperty()
  accountNo: string | null;

  @ApiProperty()
  depositor: string | null;

  @ApiProperty()
  descr: string | null;

  @ApiProperty()
  loginId: string | null;

  @ApiProperty()
  password: string | null;
}

export class BatchInsertDto {
  @ApiProperty({ isArray: true, type: SingleInsertDto })
  singleInsert: SingleInsertDto[];
}
