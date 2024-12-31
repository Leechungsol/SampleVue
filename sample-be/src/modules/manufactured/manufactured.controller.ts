import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { UserDto } from "../user/dto/user.dto";
import { User } from "../user/user.decorator";
import { CreateShipmentDto } from "./dto/create-shipment.dto";
import { CreateWarehousingDto } from "./dto/create-warehousing.dto";
import { GetDeliveryProductDto } from "./dto/get-delivery-product.dto";
import { GetInventoryHistoryDto } from "./dto/get-inventory-history.dto";
import { GetReceivingProductDto } from "./dto/get-receiving-product.dto";
import { UpdateShipmentDto } from "./dto/update-shipment.dto";
import { UpdateWarehousingDto } from "./dto/update-warehousing.dto";
import { ManufacturedService } from "./manufactured.service";

@ApiBearerAuth()
@ApiTags("manufactured")
@Controller("manufactured")
export class ManufacturedController {
  constructor(private readonly manufacturedService: ManufacturedService) {}

  @Get("/inventoryHistory")
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  @ApiOperation({ summary: "Get inventory histories" })
  @ApiOkResponse({ type: GetInventoryHistoryDto })
  @ApiParam({ name: "productKey", required: false, type: Number })
  @ApiParam({ name: "partsKey", required: false, type: Number })
  @ApiParam({ name: "colorKey", required: false, type: Number })
  @ApiParam({ name: "useKey", required: false, type: Number })
  async getInventoryHistories(
    @Query("productKey", new ParseIntPipe({ optional: true }))
    productKey: number | undefined,
    @Query("partsKey", new ParseIntPipe({ optional: true }))
    partsKey: number | undefined,
    @Query("colorKey", new ParseIntPipe({ optional: true }))
    colorKey: number | undefined,
    @Query("useKey", new ParseIntPipe({ optional: true }))
    useKey: number | undefined
  ): Promise<GetInventoryHistoryDto> {
    return this.manufacturedService.getInventoryHistories(
      productKey,
      partsKey,
      colorKey,
      useKey
    );
  }

  @Get("/receivingProduct")
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  @ApiOperation({ summary: "Get receiving products" })
  @ApiOkResponse({ type: GetReceivingProductDto })
  @ApiParam({ name: "productKey", required: false, type: Number })
  @ApiParam({ name: "partsKey", required: false, type: Number })
  @ApiParam({ name: "colorKey", required: false, type: Number })
  @ApiParam({ name: "useKey", required: false, type: Number })
  async getReceivingProducts(
    @Query("productKey", new ParseIntPipe({ optional: true }))
    productKey: number | undefined,
    @Query("partsKey", new ParseIntPipe({ optional: true }))
    partsKey: number | undefined,
    @Query("colorKey", new ParseIntPipe({ optional: true }))
    colorKey: number | undefined,
    @Query("useKey", new ParseIntPipe({ optional: true }))
    useKey: number | undefined
  ): Promise<GetReceivingProductDto> {
    return this.manufacturedService.getReceivingProducts(
      productKey,
      partsKey,
      colorKey,
      useKey
    );
  }

  @Get("/deliveryProduct")
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  @ApiOperation({ summary: "Get delivery product" })
  @ApiOkResponse({ type: GetDeliveryProductDto })
  @ApiParam({ name: "productKey", required: false, type: Number })
  @ApiParam({ name: "partsKey", required: false, type: Number })
  @ApiParam({ name: "colorKey", required: false, type: Number })
  @ApiParam({ name: "useKey", required: false, type: Number })
  async getDeliveryProduct(
    @Query("productKey", new ParseIntPipe({ optional: true }))
    productKey: number | undefined,
    @Query("partsKey", new ParseIntPipe({ optional: true }))
    partsKey: number | undefined,
    @Query("colorKey", new ParseIntPipe({ optional: true }))
    colorKey: number | undefined,
    @Query("useKey", new ParseIntPipe({ optional: true }))
    useKey: number | undefined
  ): Promise<GetDeliveryProductDto> {
    return this.manufacturedService.getDeliveryProduct(
      productKey,
      partsKey,
      colorKey,
      useKey
    );
  }

  @Post("/warehousing/create")
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  @ApiOperation({ summary: "Create warehousing" })
  @ApiCreatedResponse({ description: "Warehousing created successfully" })
  @ApiBadRequestResponse({ description: "Bad request" })
  @ApiBody({ type: CreateWarehousingDto })
  async createWarehousing(
    @User() user: UserDto,
    @Body() body: CreateWarehousingDto
  ) {
    return this.manufacturedService.createWarehousing(body, user);
  }

  @Put("/warehousing/update/:warehousingKey")
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  @ApiOperation({ summary: "Update warehousing" })
  @ApiOkResponse({ description: "Warehousing updated successfully" })
  @ApiBadRequestResponse({ description: "Bad request" })
  @ApiParam({ name: "warehousingKey", required: true, type: Number })
  @ApiBody({ type: UpdateWarehousingDto })
  async updateWarehousing(
    @User() user: UserDto,
    @Param("warehousingKey", ParseIntPipe) warehousingKey: number,
    @Body() body: UpdateWarehousingDto
  ) {
    body.warehousingKey = warehousingKey;
    return this.manufacturedService.updateWarehousing(body, user);
  }

  @Post("/shipment/create")
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  @ApiOperation({ summary: "Create a new shipment" })
  @ApiResponse({
    status: 201,
    description: "The shipment has been successfully created.",
  })
  @ApiResponse({ status: 400, description: "Bad Request" })
  @ApiBody({ type: CreateShipmentDto })
  async createShipment(@User() user: UserDto, @Body() body: CreateShipmentDto) {
    return this.manufacturedService.createShipment(body, user);
  }

  @Put("/shipment/update/:shipmentKey")
  @ApiOperation({ summary: "Update a shipment" })
  @ApiParam({
    name: "shipmentKey",
    type: "number",
    description: "The key of the shipment to update",
  })
  @ApiBody({ type: UpdateShipmentDto })
  @ApiOkResponse({
    description: "The shipment has been successfully updated",
    type: UpdateShipmentDto,
  })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  async updateShipment(
    @User() user: UserDto,
    @Param("shipmentKey", ParseIntPipe) shipmentKey: number,
    @Body() body: UpdateShipmentDto
  ) {
    body.shipmentKey = shipmentKey;
    return this.manufacturedService.updateShipment(body, user);
  }
}
