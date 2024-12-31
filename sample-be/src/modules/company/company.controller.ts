import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UnauthorizedException,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import Express from "express";
import { UserDto } from "../user/dto/user.dto";
import { User } from "../user/user.decorator";
import { CompanyService } from "./company.service";
import { CreateCompanyDto } from "./dto/create-company.dto";
import { GetListCompanyImageDto } from "./dto/get-list-company-image.dto";
import { UpdateCompanyDto } from "./dto/update-company.dto";
import { UploadImageDto } from "./dto/upload-image.dto";
import { CompanyEntity } from "../../entities/company.entity";
import { BatchInsertDto } from "./dto/batch-insert.dto";

@ApiBearerAuth()
@ApiTags("company")
@Controller("company")
/**
 * Controller for managing company-related operations.
 */
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get("/")
  @HttpCode(200)
  @ApiOperation({ summary: "Get list of companies" })
  @ApiResponse({
    status: 200,
    description: "Returns an array of companies",
    type: [CompanyEntity],
  })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  async getListCompany(): Promise<CompanyEntity[]> {
    return this.companyService.getListCompany();
  }

  @Get("/:compKey/image")
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  @HttpCode(200)
  @ApiOperation({ summary: "Get company image" })
  @ApiParam({ name: "compKey", type: "number", description: "Company key" })
  @ApiResponse({
    status: 200,
    description: "Successfully retrieved company image",
    type: GetListCompanyImageDto,
  })
  async getCompanyImage(
    @Param("compKey", ParseIntPipe) compKey: number
  ): Promise<GetListCompanyImageDto> {
    return this.companyService.getCompanyImage(compKey);
  }

  @Post("/create")
  @HttpCode(201)
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  @ApiOperation({ summary: "Create a new company" })
  @ApiBody({ type: CreateCompanyDto })
  @ApiResponse({
    status: 201,
    description: "The company has been successfully created.",
  })
  @ApiResponse({ status: 400, description: "Bad Request" })
  async createCompany(@User() user: UserDto, @Body() body: CreateCompanyDto) {
    return this.companyService.createCompany(body, user);
  }

  @Put("/update/:compKey")
  @HttpCode(200)
  @ApiOperation({ summary: "Update a company" })
  @ApiParam({ name: "compKey", type: "number", description: "Company key" })
  @ApiBody({ type: UpdateCompanyDto })
  @ApiResponse({ status: 200, description: "Company updated successfully" })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  async updateCompany(
    @User() user: UserDto,
    @Param("compKey", ParseIntPipe) compKey: number,
    @Body() body: UpdateCompanyDto
  ) {
    body.compKey = compKey;
    return this.companyService.updateCompany(body, user);
  }

  @Post("/upload-image")
  @HttpCode(200)
  @UseInterceptors(FileInterceptor("image"))
  @ApiOperation({ summary: "Upload company image" })
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        image: {
          type: "string",
          format: "binary",
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: "Image uploaded successfully" })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @User() user: UserDto,
    @Body() body: UploadImageDto
  ) {
    return this.companyService.uploadImage(body, file, user);
  }

  @Post("/batch-insert")
  @HttpCode(200)
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  @ApiOperation({ summary: "Batch insert companies" })
  @ApiBody({ type: BatchInsertDto })
  @ApiResponse({
    status: 200,
    description: "Companies batch inserted successfully",
  })
  async batchInsert(@Body() dto: BatchInsertDto, @User() user: UserDto) {
    return this.companyService.batchInsert(dto, user);
  }
}
