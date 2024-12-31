import { Controller, Get } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { RankWebMappingEntity } from "../../entities/rank-web-mapping.entity";
import { UserDto } from "../user/dto/user.dto";
import { User } from "../user/user.decorator";
import { RankService } from "./rank.service";

@ApiBearerAuth()
@ApiTags("rank")
@Controller("rank")
export class RankController {
  constructor(private readonly rankService: RankService) {}

  @Get("/web-mapping")
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  @ApiOperation({ summary: "Get rank web mapping" })
  @ApiResponse({
    status: 200,
    description: "Returns the rank web mapping",
    type: [RankWebMappingEntity],
  })
  async getRankWebMapping(
    @User() user: UserDto
  ): Promise<RankWebMappingEntity[]> {
    return this.rankService.getRankWebMapping(user);
  }
}
