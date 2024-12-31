import { ApiProperty } from "@nestjs/swagger";

export class GetProcessDto {
  @ApiProperty()
  detailKey: number;
  @ApiProperty()
  itemKey: number;
  @ApiProperty()
  partsKey: number;
  @ApiProperty()
  colorKey: number | undefined;
  @ApiProperty()
  useKey: number | undefined;
  @ApiProperty()
  receiving: number;
  @ApiProperty()
  receivingQuantity: number;
  @ApiProperty()
  quantity: number;
  @ApiProperty()
  balanceQuantity: number;
  @ApiProperty()
  descr: string | undefined;
  @ApiProperty()
  explainKey: number;
  @ApiProperty()
  processCode: number;
  @ApiProperty()
  vender: number;
  @ApiProperty()
  processExplain: string;
}
