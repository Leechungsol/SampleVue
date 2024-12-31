import { ApiProperty } from "@nestjs/swagger";
import { CreateWarehousingDto } from "./create-warehousing.dto";

/**
 * Data transfer object for updating a warehousing record.
 * Extends the `CreateWarehousingDto` to include the `warehousingKey` property.
 */
export class UpdateWarehousingDto extends CreateWarehousingDto {
  @ApiProperty()
  warehousingKey: number;
}
