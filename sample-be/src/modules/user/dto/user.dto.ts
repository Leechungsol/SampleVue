import { ApiProperty } from "@nestjs/swagger";

export class UserDto {
  @ApiProperty()
  userId: string;
  @ApiProperty()
  userName: string;
  @ApiProperty()
  rank: number;
}
