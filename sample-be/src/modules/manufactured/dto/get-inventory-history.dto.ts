import { ApiProperty } from "@nestjs/swagger";

export class GetInventoryHistoryDto {
  @ApiProperty()
  no: number;
  @ApiProperty()
  productName: string;
  @ApiProperty()
  partsName: string;
  @ApiProperty()
  colorName: string;
  @ApiProperty()
  useName: string;
  @ApiProperty()
  stock: number;
  @ApiProperty()
  productKey: number;
  @ApiProperty()
  partsKey: number;
  @ApiProperty()
  colorKey: number;
  @ApiProperty()
  useKey: number;
}
