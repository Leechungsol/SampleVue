import {
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Query,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { ChartService } from "./chart.service";
import { GetDetailFlowerDto } from "./dto/get-detail-flower.dto";
import { GetListFlowerDto } from "./dto/get-list-flower.dto";

@ApiBearerAuth()
@ApiTags("chart")
@Controller("chart")
export class ChartController {
  constructor(private readonly chartService: ChartService) {}

  @Get("/")
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  @ApiOperation({ summary: "Get flower list" })
  @ApiResponse({
    status: 200,
    description: "Successfully retrieved flower list",
    type: GetListFlowerDto,
  })
  async getFlowerList(): Promise<GetListFlowerDto> {
    return this.chartService.getFlowerList();
  }

  @Get("/:flowerKey")
  @ApiOperation({ summary: "Get flower detail" })
  @ApiParam({
    name: "flowerKey",
    type: "number",
    description: "Unique identifier of the flower",
  })
  @ApiQuery({
    name: "alive",
    type: "number",
    required: false,
    description: "Filter for alive flowers (0 or 1)",
  })
  @ApiResponse({
    status: 200,
    description: "Successful operation",
    type: GetDetailFlowerDto,
  })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  async getDetail(
    @Param("flowerKey", ParseIntPipe) flowerKey: number,
    @Query("alive", new DefaultValuePipe(0), ParseIntPipe) alive: number
  ): Promise<GetDetailFlowerDto> {
    return this.chartService.getDetail(flowerKey, alive);
  }
}
