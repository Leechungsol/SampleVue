import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  UseInterceptors,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { GetDetailDto } from "./dto/get-detail.dto";
import { GetFilesDto } from "./dto/get-files.dto";
import { SearchQueryDto } from "./dto/search-query.dto";
import { SpecificationService } from "./specification.service";

@ApiBearerAuth()
@ApiTags("specification")
@Controller("specification")
@UseInterceptors(ClassSerializerInterceptor)
export class SpecificationController {
  constructor(private readonly instructionService: SpecificationService) {}

  @Get("/")
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiOperation({ summary: "Search specifications within a date range" })
  @ApiResponse({
    status: 200,
    description: "Successfully retrieved search results",
    type: SearchQueryDto,
  })
  @ApiParam({
    name: "from",
    required: true,
    description: "Start date for the search range",
    type: Date,
  })
  @ApiParam({
    name: "to",
    required: true,
    description: "End date for the search range",
    type: Date,
  })
  async searchQuery(
    @Query("from") from: Date,
    @Query("to") to: Date
  ): Promise<SearchQueryDto> {
    return this.instructionService.searchQuery(from, to);
  }

  @Get("/detail/:explainKey")
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiOperation({ summary: "Get specification detail" })
  @ApiParam({
    name: "explainKey",
    type: "number",
    description: "The explain key for the specification detail",
  })
  @ApiResponse({
    status: 200,
    description: "Returns the specification detail",
    type: SearchQueryDto,
  })
  async getDetail(
    @Query("explainKey", new ParseIntPipe({ optional: false }))
    explainKey: number
  ): Promise<SearchQueryDto> {
    return this.instructionService.getDetail(explainKey);
  }

  @Get("/:explainKey")
  @ApiOperation({ summary: "Get specification by explain key" })
  @ApiParam({
    name: "explainKey",
    type: "number",
    description: "Explain key of the specification",
  })
  @ApiResponse({
    status: 200,
    description: "Returns the specification details",
    type: GetDetailDto,
  })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  async getByExplainKey(
    @Param("explainKey", new ParseIntPipe({ optional: false }))
    explainKey: number
  ): Promise<GetDetailDto> {
    return this.instructionService.getByExplainKey(explainKey);
  }

  @Get("/:explainKey/files")
  @ApiOperation({ summary: "Get files for a specific explain key" })
  @ApiParam({
    name: "explainKey",
    type: "number",
    description: "The explain key to fetch files for",
  })
  @ApiResponse({
    status: 200,
    description: "Successfully retrieved files",
    type: GetFilesDto,
  })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  async getFiles(
    @Param("explainKey", new ParseIntPipe({ optional: false }))
    explainKey: number
  ): Promise<GetFilesDto> {
    return this.instructionService.getFiles(explainKey);
  }
}
