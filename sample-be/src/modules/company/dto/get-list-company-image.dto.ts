import { ApiProperty } from "@nestjs/swagger";

export class GetListCompanyImageDto {
  @ApiProperty()
  imageKey: number;

  @ApiProperty()
  image: string;

  @ApiProperty()
  createId: string;

  @ApiProperty()
  createDtm: Date;

  @ApiProperty()
  compKey: number;
}
