import { ApiProperty } from "@nestjs/swagger";
export class GetReceivingProductDto {
  @ApiProperty()
  shipmentKey: number;

  @ApiProperty()
  productKey: number;

  @ApiProperty()
  partsKey: number;

  @ApiProperty()
  colorKey: number;

  @ApiProperty()
  useKey: number;

  @ApiProperty()
  shipmentDate: string | null;

  @ApiProperty()
  shipmentQuantity: number | null;

  @ApiProperty()
  descr: string | null;

  @ApiProperty()
  createId: string | null;

  @ApiProperty()
  createDtm: Date | null;
}
