import { ApiProperty } from "@nestjs/swagger";

export class GetProcessDto {
  @ApiProperty()
  explainKey: number;
  @ApiProperty()
  orderDate: Date | string;
  @ApiProperty()
  orderCompKey: number;
  @ApiProperty()
  goodsName: string;
  @ApiProperty()
  receiving: number;
  @ApiProperty()
  partsKey: number;
  @ApiProperty()
  colorKey: number;
  @ApiProperty()
  useKey: number;
  @ApiProperty()
  receivingQuantity: number;
  @ApiProperty()
  quantity: number;
  @ApiProperty()
  descr: string;
}
