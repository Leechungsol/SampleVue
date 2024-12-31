import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateWarehousingDto {
  @ApiProperty()
  productKey: number;

  @ApiProperty()
  partsKey: number;

  @ApiProperty()
  colorKey: number;

  @ApiProperty()
  useKey: number;

  @ApiProperty()
  machineKey: number;

  @ApiPropertyOptional({ maxLength: 10 })
  warehousingDate: string;

  @ApiPropertyOptional()
  warehousingQuantity: number;

  @ApiPropertyOptional({ maxLength: 50 })
  machine: string;

  @ApiPropertyOptional({ maxLength: 50 })
  mould: string;

  @ApiPropertyOptional()
  isDayNight: boolean;

  @ApiPropertyOptional({ maxLength: 500 })
  descr: string;
}
