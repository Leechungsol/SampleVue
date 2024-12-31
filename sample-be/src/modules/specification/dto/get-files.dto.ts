import { ApiProperty } from "@nestjs/swagger";

export class GetFilesDto {
  @ApiProperty()
  autoKey: number;

  @ApiProperty()
  fileName: string | null;

  @ApiProperty()
  image: string | null;

  @ApiProperty()
  createId: string | null;

  @ApiProperty()
  createDtm: Date | null;

  @ApiProperty()
  explainKey: number;
}
