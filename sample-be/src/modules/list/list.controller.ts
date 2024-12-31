import { Controller, Get } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { ListService } from "./list.service";
import { CompanyEntity } from "../../entities/company.entity";
import { MachineEntity } from "../../entities/machine.entity";
import { ProcessEntity } from "../../entities/process.entity";
import { CompClassifyEntity } from "../../entities/comp-classify.entity";
import { PartsUseEntity } from "../../entities/parts-use.entity";
import { PartsColorEntity } from "../../entities/parts-color.entity";
import { PartsTypeEntity } from "../../entities/parts-type.entity";
import { ProductEntity } from "../../entities/product.entity";

@ApiBearerAuth()
@ApiTags("list")
@Controller("list")
/**
 * Controller for handling list-related API endpoints.
 * Provides methods to retrieve various entities such as products, part types, part colors, part usages, component classifications, processes, machines, and companies.
 */
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Get("/product")
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  @ApiOperation({ summary: "Get all products" })
  @ApiResponse({
    status: 200,
    description: "Returns an array of products",
    type: [ProductEntity],
  })
  async getProduct(): Promise<ProductEntity[]> {
    return this.listService.getProduct();
  }

  @Get("/partsType")
  @ApiOperation({ summary: "Get all parts types" })
  @ApiResponse({
    status: 200,
    description: "Returns an array of parts types",
    type: [PartsTypeEntity],
  })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  async getPartsType(): Promise<PartsTypeEntity[]> {
    return this.listService.getPartsType();
  }

  @Get("/partsColor")
  @ApiOperation({ summary: "Get all parts colors" })
  @ApiResponse({
    status: 200,
    description: "Returns an array of parts colors",
    type: [PartsColorEntity],
  })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  async getPartsColor(): Promise<PartsColorEntity[]> {
    return this.listService.getPartsColor();
  }

  @Get("/partsUse")
  @ApiOperation({ summary: "Get all parts uses" })
  @ApiResponse({
    status: 200,
    description: "Returns an array of parts uses",
    type: [PartsUseEntity],
  })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  async getPartsUse(): Promise<PartsUseEntity[]> {
    return this.listService.getPartsUse();
  }

  @Get("/compClassify")
  @ApiOperation({ summary: "Get component classifications" })
  @ApiResponse({
    status: 200,
    description: "Successfully retrieved component classifications",
    type: [CompClassifyEntity],
  })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  async getCompClassify(): Promise<CompClassifyEntity[]> {
    return this.listService.getCompClassify();
  }

  @Get("/process")
  @ApiOperation({ summary: "Get all processes" })
  @ApiResponse({
    status: 200,
    description: "Returns an array of ProcessEntity objects",
    type: [ProcessEntity],
  })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  async getProcess(): Promise<ProcessEntity[]> {
    return this.listService.getProcess();
  }

  @Get("/machine")
  @ApiOperation({ summary: "Get all machines" })
  @ApiResponse({
    status: 200,
    description: "Returns an array of machines",
    type: [MachineEntity],
  })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  async getMachine(): Promise<MachineEntity[]> {
    return this.listService.getMachine();
  }

  @Get("/company")
  @ApiOperation({ summary: "Get all companies" })
  @ApiResponse({
    status: 200,
    description: "Returns an array of companies",
    type: [CompanyEntity],
  })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  async getCompany(): Promise<CompanyEntity[]> {
    return this.listService.getCompany();
  }
}
