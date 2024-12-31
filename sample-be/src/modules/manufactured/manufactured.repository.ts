import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { UserDto } from "../user/dto/user.dto";
import { CreateShipmentDto } from "./dto/create-shipment.dto";
import { CreateWarehousingDto } from "./dto/create-warehousing.dto";
import { GetDeliveryProductDto } from "./dto/get-delivery-product.dto";
import { GetInventoryHistoryDto } from "./dto/get-inventory-history.dto";
import { GetReceivingProductDto } from "./dto/get-receiving-product.dto";
import { UpdateShipmentDto } from "./dto/update-shipment.dto";
import { UpdateWarehousingDto } from "./dto/update-warehousing.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { MouldedWarehousingEntity } from "../../entities/moulded-warehousing.entity";
import { MouldedShipmentEntity } from "../../entities/moulded-shipment.entity";

@Injectable()
export class ManufacturedRepository {
  private readonly dataSource: DataSource;
  constructor(
    dataSource: DataSource,
    @InjectRepository(MouldedWarehousingEntity)
    private readonly mouldedWarehousingRepository: Repository<MouldedWarehousingEntity>,
    @InjectRepository(MouldedShipmentEntity)
    private readonly mouldedShipmentRepository: Repository<MouldedShipmentEntity>
  ) {
    this.dataSource = dataSource;
  }

  /**
   * Retrieves the next key value for the specified key.
   *
   * @param key - The key to retrieve the next value for.
   * @returns A promise that resolves to the next key value.
   */
  async getNextKey(key: string): Promise<number> {
    const query = `
      DECLARE @keyNumber int
      DECLARE @Error int

      EXEC dbo.usp_GetNextKey @0, @keyNumber OUTPUT

      SELECT @keyNumber as keyNumber, @Error as error
    `;

    const data = await this.dataSource.query(query, [key]);
    return data[0].keyNumber;
  }

  /**
   * Retrieves the delivery products based on the specified product, parts, color, and use keys.
   *
   * @param productKey - The key of the product to filter the delivery products by.
   * @param partsKey - The key of the parts to filter the delivery products by.
   * @param colorKey - The key of the color to filter the delivery products by.
   * @param useKey - The key of the use to filter the delivery products by.
   * @returns A promise that resolves to the delivery products data.
   */
  async getDeliveryProduct(
    productKey: number | undefined,
    partsKey: number | undefined,
    colorKey: number | undefined,
    useKey: number | undefined
  ): Promise<GetDeliveryProductDto> {
    const queryData = `
        SELECT 
          ROW_NUMBER() OVER(ORDER BY ShipmentKey DESC) AS no,
          ShipmentKey as shipmentKey,
          ProductKey as productKey,
          PartsKey as partsKey,
          ColorKey as colorKey,
          UseKey as useKey,
          ShipmentDate as shipmentDate,
          ShipmentQuantity as shipmentQuantity,
          Descr as descr,
          CreateID as createId
        FROM MouldedShipment
        WHERE (@0 IS NULL OR ProductKey = @0)
          AND (@1 IS NULL OR PartsKey = @1)
          AND (@2 IS NULL OR ColorKey = @2)
          AND (@3 IS NULL OR UseKey = @3)
        ORDER BY ShipmentKey DESC
      `;
    return this.dataSource.query(queryData, [
      productKey,
      partsKey,
      colorKey,
      useKey,
    ]);
  }

  /**
   * Retrieves the receiving products based on the specified product, parts, color, and use keys.
   *
   * @param productKey - The key of the product to filter the receiving products by.
   * @param partsKey - The key of the parts to filter the receiving products by.
   * @param colorKey - The key of the color to filter the receiving products by.
   * @param useKey - The key of the use to filter the receiving products by.
   * @returns A promise that resolves to the receiving products data.
   */
  async getReceivingProducts(
    productKey: number | undefined,
    partsKey: number | undefined,
    colorKey: number | undefined,
    useKey: number | undefined
  ): Promise<GetReceivingProductDto> {
    const dataQuery = `
        SELECT ROW_NUMBER() OVER(ORDER BY WarehousingKey DESC) AS no,
        [WarehousingKey] as warehousingKey,
        [ProductKey] as productKey,
        [PartsKey] as partsKey,
        [ColorKey] as colorKey,
        [UseKey] as useKey,
        [WarehousingDate] as warehousingDate,
        [WarehousingQuantity] as warehousingQuantity,
        [Machine] as machine,
        [Mould] as mould,
        [MachineKey] as machineKey,
        CASE [isDayNight]
            WHEN 0 THEN '주간'
            WHEN 1 THEN '야간'
        END AS isDayNight,
        [Descr] as descr,
        [CreateID] as createID,
        [CreateDtm] as createDtm
        FROM [MouldedWarehousing]
        WHERE (@0 IS NULL OR ProductKey = @0)
        AND (@1 IS NULL OR PartsKey = @1)
        AND (@2 IS NULL OR ColorKey = @2)
        AND (@3 IS NULL OR UseKey = @3)
        ORDER BY WarehousingKey DESC
      `;
    return this.dataSource.query(dataQuery, [
      productKey,
      partsKey,
      colorKey,
      useKey,
    ]);
  }

  /**
   * Retrieves the inventory history for the specified product, parts, color, and use.
   *
   * @param productKey - The key of the product to filter the inventory history by.
   * @param partsKey - The key of the parts to filter the inventory history by.
   * @param colorKey - The key of the color to filter the inventory history by.
   * @param useKey - The key of the use to filter the inventory history by.
   * @returns A promise that resolves to the inventory history data.
   */
  async getInventoryHistories(
    productKey: number | undefined,
    partsKey: number | undefined,
    colorKey: number | undefined,
    useKey: number | undefined
  ): Promise<GetInventoryHistoryDto> {
    const dataQuery = `
      SELECT * FROM (
        SELECT ROW_NUMBER() OVER(ORDER BY b.ProductName, c.PartsName, d.ColorName, e.UseName) AS no,
          b.ProductName as productName,
          c.PartsName as partsName,
          d.ColorName as colorName,
          e.UseName as useName,
          a.Stock as stock,
          a.ProductKey as productKey,
          a.PartsKey as partsKey,
          a.ColorKey as colorKey,
          a.UseKey as useKey
        FROM ( SELECT ProductKey,
                      PartsKey,
                      ColorKey,
                      UseKey,
                      Stock
                FROM MouldedStock ) a
        LEFT JOIN ( SELECT ProductKey,
                          ProductName
                    FROM Product ) b
          ON a.ProductKey = b.ProductKey
        LEFT JOIN ( SELECT PartsKey,
                          PartsName
                    FROM PartsType ) c
          ON a.PartsKey = c.PartsKey
        LEFT JOIN ( SELECT ColorKey,
                          ColorName
                    FROM PartsColor ) d
          ON a.ColorKey = d.ColorKey
        LEFT JOIN ( SELECT UseKey,
                          UseName
                    FROM PartsUse ) e
          ON a.UseKey = e.UseKey
        WHERE 1 = 1
          AND (@0 IS NULL OR a.ProductKey = @0)
          AND (@1 IS NULL OR a.PartsKey = @1)
          AND (@2 IS NULL OR a.ColorKey = @2)
          AND (@3 IS NULL OR a.UseKey = @3)
      ) AS subquery
      ORDER BY ProductName,
             PartsName,
             ColorName,
             UseName
    `;
    return this.dataSource.query(dataQuery, [
      productKey,
      partsKey,
      colorKey,
      useKey,
    ]);
  }

  /**
   * Creates a new warehousing record in the database.
   *
   * @param body - An object containing the details of the new warehousing.
   * @param body.warehousingDate - The date of the warehousing.
   * @param body.productKey - The key of the product associated with the warehousing.
   * @param body.partsKey - The key of the parts associated with the warehousing.
   * @param body.colorKey - The key of the color associated with the warehousing.
   * @param body.useKey - The key of the use associated with the warehousing.
   * @param body.machineKey - The key of the machine associated with the warehousing.
   * @param body.warehousingQuantity - The quantity of the warehousing.
   * @param body.machine - The machine details.
   * @param body.mould - The mould details.
   * @param body.isDayNight - Indicates whether the warehousing was done during the day or night.
   * @param body.descr - A description of the warehousing.
   * @param user - An object containing the user details.
   * @param user.userId - The unique identifier of the user who is creating the warehousing.
   */
  async createWarehousing(
    body: CreateWarehousingDto,
    user: UserDto
  ): Promise<void> {
    const warehousingKey = await this.getNextKey("WarehousingKey");
    await this.mouldedWarehousingRepository.save({
      ...body,
      warehousingKey,
      createId: user.userId,
      createDtm: new Date(),
    });
  }

  /**
   * Updates an existing warehousing record in the database.
   *
   * @param body - An object containing the updated warehousing details.
   * @param body.warehousingKey - The unique identifier of the warehousing to be updated.
   * @param body.warehousingDate - The date of the warehousing.
   * @param body.productKey - The key of the product associated with the warehousing.
   * @param body.partsKey - The key of the parts associated with the warehousing.
   * @param body.colorKey - The key of the color associated with the warehousing.
   * @param body.useKey - The key of the use associated with the warehousing.
   * @param body.machineKey - The key of the machine associated with the warehousing.
   * @param body.warehousingQuantity - The quantity of the warehousing.
   * @param body.machine - The machine details.
   * @param body.mould - The mould details.
   * @param body.isDayNight - Indicates whether the warehousing was done during the day or night.
   * @param body.descr - A description of the warehousing.
   * @param user - An object containing the user details.
   * @param user.userId - The unique identifier of the user who is updating the warehousing.
   */
  async updateWarehousing(
    body: UpdateWarehousingDto,
    user: UserDto
  ): Promise<void> {
    await this.mouldedWarehousingRepository.update(
      {
        warehousingKey: body.warehousingKey,
      },
      {
        ...body,
        createId: user.userId,
        createDtm: new Date(),
      }
    );
  }

  /**
   * Creates a new shipment record in the database.
   *
   * @param body - An object containing the details of the new shipment.
   * @param body.productKey - The key of the product associated with the shipment.
   * @param body.partsKey - The key of the parts associated with the shipment.
   * @param body.colorKey - The key of the color associated with the shipment.
   * @param body.useKey - The key of the use associated with the shipment.
   * @param body.shipmentDate - The date of the shipment.
   * @param body.shipmentQuantity - The quantity of the shipment.
   * @param body.descr - A description of the shipment.
   * @param user - An object containing the user details.
   * @param user.userId - The unique identifier of the user who is creating the shipment.
   */
  async createShipment(body: CreateShipmentDto, user: UserDto): Promise<void> {
    const shipmentKey = await this.getNextKey("ShipmentKey");

    await this.mouldedShipmentRepository.save({
      shipmentKey,
      ...body,
      createId: user.userId,
      createDtm: new Date(),
    });
  }

  /**
   * Updates an existing shipment record in the database.
   *
   * @param body - An object containing the updated shipment details.
   * @param body.shipmentKey - The unique identifier of the shipment to be updated.
   * @param body.productKey - The key of the product associated with the shipment.
   * @param body.partsKey - The key of the parts associated with the shipment.
   * @param body.colorKey - The key of the color associated with the shipment.
   * @param body.useKey - The key of the use associated with the shipment.
   * @param body.shipmentDate - The date of the shipment.
   * @param body.shipmentQuantity - The quantity of the shipment.
   * @param body.descr - A description of the shipment.
   * @param user - An object containing the user details.
   * @param user.userId - The unique identifier of the user who is updating the shipment.
   */
  async updateShipment(body: UpdateShipmentDto, user: UserDto): Promise<void> {
    await this.mouldedShipmentRepository.update(
      {
        shipmentKey: body.shipmentKey,
      },
      {
        ...body,
        createId: user.userId,
        createDtm: new Date(),
      }
    );
  }
}
