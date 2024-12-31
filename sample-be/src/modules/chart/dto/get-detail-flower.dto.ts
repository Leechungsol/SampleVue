import { ApiProperty } from "@nestjs/swagger";

export class GetDetailFlowerDto {
  @ApiProperty()
  flowerCompName: string;
  @ApiProperty()
  alive: number;
  @ApiProperty()
  orderDate: string;
  @ApiProperty()
  discardDate: string;
  @ApiProperty()
  flowerPotName: string;
  @ApiProperty()
  flowerPotPrice: number;
}
