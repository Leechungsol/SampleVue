import { Injectable } from "@nestjs/common";
import { UserDto } from "../user/dto/user.dto";
import { CreateShipmentDto } from "./dto/create-shipment.dto";
import { CreateWarehousingDto } from "./dto/create-warehousing.dto";
import { GetDeliveryProductDto } from "./dto/get-delivery-product.dto";
import { GetInventoryHistoryDto } from "./dto/get-inventory-history.dto";
import { GetReceivingProductDto } from "./dto/get-receiving-product.dto";
import { UpdateShipmentDto } from "./dto/update-shipment.dto";
import { UpdateWarehousingDto } from "./dto/update-warehousing.dto";
import { ManufacturedRepository } from "./manufactured.repository";
@Injectable()
export class ManufacturedService {
  constructor(private readonly manufactureRepository: ManufacturedRepository) {}

  /**
   * Retrieves the inventory history for the specified product, parts, color, and use.
   *
   * @param productKey - The unique identifier for the product.
   * @param partsKey - The unique identifier for the parts.
   * @param colorKey - The unique identifier for the color.
   * @param useKey - The unique identifier for the use.
   * @returns A promise that resolves to the inventory history data.
   */
  async getInventoryHistories(
    productKey: number | undefined,
    partsKey: number | undefined,
    colorKey: number | undefined,
    useKey: number | undefined
  ): Promise<GetInventoryHistoryDto> {
    return this.manufactureRepository.getInventoryHistories(
      productKey,
      partsKey,
      colorKey,
      useKey
    );
  }

  /**
   * Retrieves the receiving products for the specified product, parts, color, and use.
   *
   * @param productKey - The unique identifier for the product.
   * @param partsKey - The unique identifier for the parts.
   * @param colorKey - The unique identifier for the color.
   * @param useKey - The unique identifier for the use.
   * @returns A promise that resolves to the receiving product data.
   */
  async getReceivingProducts(
    productKey: number | undefined,
    partsKey: number | undefined,
    colorKey: number | undefined,
    useKey: number | undefined
  ): Promise<GetReceivingProductDto> {
    return this.manufactureRepository.getReceivingProducts(
      productKey,
      partsKey,
      colorKey,
      useKey
    );
  }

  /**
   * Retrieves the delivery products for the specified product, parts, color, and use.
   *
   * @param productKey - The unique identifier for the product.
   * @param partsKey - The unique identifier for the parts.
   * @param colorKey - The unique identifier for the color.
   * @param useKey - The unique identifier for the use.
   * @returns A promise that resolves to the delivery product data.
   */
  async getDeliveryProduct(
    productKey: number | undefined,
    partsKey: number | undefined,
    colorKey: number | undefined,
    useKey: number | undefined
  ): Promise<GetDeliveryProductDto> {
    return this.manufactureRepository.getDeliveryProduct(
      productKey,
      partsKey,
      colorKey,
      useKey
    );
  }

  /**
   * Creates a new warehousing record.
   *
   * @param body - The data required to create a new warehousing record.
   * @param user - The user who is creating the warehousing record.
   * @returns A promise that resolves to the created warehousing record.
   */
  async createWarehousing(body: CreateWarehousingDto, user: UserDto) {
    return this.manufactureRepository.createWarehousing(body, user);
  }

  /**
   * Updates an existing warehousing record.
   *
   * @param body - The data required to update the warehousing record.
   * @param user - The user who is updating the warehousing record.
   * @returns A promise that resolves to the updated warehousing record.
   */
  async updateWarehousing(body: UpdateWarehousingDto, user: UserDto) {
    return this.manufactureRepository.updateWarehousing(body, user);
  }

  /**
   * Creates a new shipment.
   *
   * @param body - The data required to create a new shipment.
   * @param user - The user who is creating the shipment.
   * @returns A promise that resolves to the created shipment.
   */
  async createShipment(body: CreateShipmentDto, user: UserDto) {
    return this.manufactureRepository.createShipment(body, user);
  }

  /**
   * Updates an existing shipment.
   *
   * @param body - The data required to update the shipment.
   * @param user - The user who is updating the shipment.
   * @returns A promise that resolves to the updated shipment.
   */
  async updateShipment(body: UpdateShipmentDto, user: UserDto) {
    return this.manufactureRepository.updateShipment(body, user);
  }
}
