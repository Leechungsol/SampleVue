import { ApiProperty } from "@nestjs/swagger";


export class SearchQueryDto {
  @ApiProperty()
  explainKey: number;

  @ApiProperty()
  compClassify: string;

  @ApiProperty()
  orderCompKey: number;

  @ApiProperty()
  orderDate: string | null;

  @ApiProperty()
  orderQuantity: number | null;

  @ApiProperty()
  goodsCost: number | null;

  @ApiProperty()
  goodsName: string | null;

  @ApiProperty()
  orderAmount: number | null;

  @ApiProperty()
  finalDueCompKey: number | null;

  @ApiProperty()
  finalDueDate: string | null;

  @ApiProperty()
  standard: string | null;

  @ApiProperty()
  isTax: boolean | null;

  @ApiProperty()
  taxAmount: number | null;

  @ApiProperty()
  isClose: boolean | null;

  @ApiProperty()
  reference: string | null;

  @ApiProperty()
  descr: string | null;

  @ApiProperty()
  isDelete: boolean | null;

  @ApiProperty()
  createId: string | null;

  @ApiProperty()
  createDtm: Date | null;

  @ApiProperty()
  isDefect: boolean | null;

  @ApiProperty()
  clientStandard: string | null;

  @ApiProperty()
  clientDescr: string | null;

  @ApiProperty()
  director: string | null;

  @ApiProperty()
  isSample: boolean | null;

  @ApiProperty()
  supplyDate: string | null;

  @ApiProperty()
  supplyQuantity: number | null;

  @ApiProperty()
  supplyAmount: number | null;
}
