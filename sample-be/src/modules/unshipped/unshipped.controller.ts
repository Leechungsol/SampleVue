import { Controller, Get, ParseIntPipe, Query } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { GetProcessDto } from "./dto/get-process.dto";
import { UnshippedService } from "./unshipped.service";

@ApiBearerAuth()
@ApiTags("unshipped")
@Controller("unshipped")
export class UnshippedController {
  constructor(private readonly unshippedService: UnshippedService) {}

  @Get("/")
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  @ApiOperation({ summary: "Search for unshipped items" })
  @ApiQuery({
    name: "from",
    type: Date,
    required: true,
    description: "Start date for the search",
  })
  @ApiQuery({
    name: "to",
    type: Date,
    required: true,
    description: "End date for the search",
  })
  @ApiQuery({
    name: "receiving",
    type: Number,
    required: true,
    description: "Receiving number",
  })
  @ApiResponse({
    status: 200,
    description: "Successful operation",
    type: GetProcessDto,
  })
  async searchQuery(
    @Query("from") from: Date,
    @Query("to") to: Date,
    @Query("receiving", new ParseIntPipe({ optional: true })) receiving: number
  ): Promise<GetProcessDto> {
    return this.unshippedService.getProcess(from, to, receiving);
  }
}
