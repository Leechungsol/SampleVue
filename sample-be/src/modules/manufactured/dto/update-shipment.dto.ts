import { ApiProperty } from "@nestjs/swagger";
import { CreateShipmentDto } from "./create-shipment.dto";

export class UpdateShipmentDto extends CreateShipmentDto {
  @ApiProperty()
  shipmentKey: number;
}
