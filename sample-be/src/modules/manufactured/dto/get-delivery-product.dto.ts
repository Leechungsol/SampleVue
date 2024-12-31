import { ApiProperty } from "@nestjs/swagger";

export class GetDeliveryProductDto {
  @ApiProperty()
  no: number;
  
  @ApiProperty()
  warehousingKey: number;

  @ApiProperty()
  productKey: number;

  @ApiProperty()
  partsKey: number;

  @ApiProperty()
  colorKey: number;

  @ApiProperty()
  useKey: number;

  @ApiProperty()
  warehousingDate: string | null;

  @ApiProperty()
  warehousingQuantity: number | null;

  @ApiProperty()
  machine: string | null;

  @ApiProperty()
  mould: string | null;

  @ApiProperty()
  isDayNight: boolean | null;

  @ApiProperty()
  descr: string | null;

  @ApiProperty()
  createId: string | null;

  @ApiProperty()
  createDtm: Date | null;

  @ApiProperty()
  machineKey: number | null;
}
