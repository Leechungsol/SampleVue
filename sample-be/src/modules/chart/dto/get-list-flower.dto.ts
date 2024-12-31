import { ApiProperty } from "@nestjs/swagger";

export class GetListFlowerDto {
  @ApiProperty()
  flowerCompKey: number;
  @ApiProperty()
  flowerCompName: string;
  @ApiProperty()
  alive: number;
  @ApiProperty()
  num: number;
}
