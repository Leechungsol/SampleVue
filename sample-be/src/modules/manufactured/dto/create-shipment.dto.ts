import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

/**
 * Data transfer object (DTO) for creating a new shipment.
 *
 * This DTO defines the properties required to create a new shipment in the system.
 */
export class CreateShipmentDto {
  @ApiProperty()
  productKey: number;

  @ApiProperty()
  partsKey: number;

  @ApiProperty()
  colorKey: number;

  @ApiProperty()
  useKey: number;

  @ApiPropertyOptional({ maxLength: 10 })
  shipmentDate: string;

  @ApiPropertyOptional()
  shipmentQuantity: number;

  @ApiPropertyOptional({ maxLength: 500 })
  descr: string;
}
