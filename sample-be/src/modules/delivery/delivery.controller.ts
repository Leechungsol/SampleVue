import { Controller, Get, Param, ParseIntPipe, Query } from "@nestjs/common";

import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { DeliveryService } from "./delivery.service";
import { GetProcessDto } from "./dto/get-process.dto";
import { SearchQueryDto } from "./dto/search-query.dto";

@ApiBearerAuth()
@ApiTags("delivery")
@Controller("delivery")
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}

  @Get("/")
  @ApiOperation({ summary: "Search delivery query" })
  @ApiQuery({
    name: "from",
    type: Date,
    required: true,
    description: "Start date for the search query",
  })
  @ApiQuery({
    name: "to",
    type: Date,
    required: true,
    description: "End date for the search query",
  })
  @ApiResponse({
    status: 200,
    description: "Successful search query",
    type: SearchQueryDto,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async searchQuery(
    @Query("from") from: Date,
    @Query("to") to: Date
  ): Promise<SearchQueryDto> {
    return this.deliveryService.searchQuery(from, to);
  }

  @Get("/:explainKey/process")
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiOperation({ summary: "Get process by explain key" })
  @ApiResponse({
    status: 200,
    description: "Successfully retrieved process",
    type: GetProcessDto,
  })
  @ApiParam({
    name: "explainKey",
    type: Number,
    description: "The explain key of the process",
    required: true,
  })
  async getProcessByExplainKey(
    @Param("explainKey", ParseIntPipe) explainKey: number
  ): Promise<GetProcessDto> {
    return this.deliveryService.getProcessByExplainKey(explainKey);
  }
}
