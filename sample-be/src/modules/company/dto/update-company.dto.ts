import { ApiProperty } from "@nestjs/swagger";
import { CreateCompanyDto } from "./create-company.dto";

export class UpdateCompanyDto extends CreateCompanyDto {
  @ApiProperty()
  compKey: number;
}
