import { Injectable } from "@nestjs/common";
import { ListRepository } from "./list.repository";
import { ProductEntity } from "../../entities/product.entity";
import { PartsTypeEntity } from "../../entities/parts-type.entity";
import { PartsColorEntity } from "../../entities/parts-color.entity";
import { PartsUseEntity } from "../../entities/parts-use.entity";
import { CompClassifyEntity } from "../../entities/comp-classify.entity";
import { ProcessEntity } from "../../entities/process.entity";
import { MachineEntity } from "../../entities/machine.entity";
import { CompanyEntity } from "../../entities/company.entity";

@Injectable()
/**
 * Provides methods to retrieve various entities from the ListRepository.
 */
export class ListService {
  constructor(private readonly listRepository: ListRepository) {}

  /**
   * Retrieves an array of `ProductEntity` objects from the `ListRepository`.
   * @returns {Promise<ProductEntity[]>} A promise that resolves to an array of `ProductEntity` objects.
   */
  async getProduct(): Promise<ProductEntity[]> {
    return this.listRepository.getProduct();
  }

  /**
   * Retrieves an array of `PartsTypeEntity` objects from the `ListRepository`.
   * @returns {Promise<PartsTypeEntity[]>} A promise that resolves to an array of `PartsTypeEntity` objects.
   */
  async getPartsType(): Promise<PartsTypeEntity[]> {
    return this.listRepository.getPartsType();
  }

  /**
   * Retrieves an array of `PartsColorEntity` objects from the `ListRepository`.
   * @returns {Promise<PartsColorEntity[]>} A promise that resolves to an array of `PartsColorEntity` objects.
   */
  async getPartsColor(): Promise<PartsColorEntity[]> {
    return this.listRepository.getPartsColor();
  }

  /**
   * Retrieves an array of `PartsUseEntity` objects from the `ListRepository`.
   * @returns {Promise<PartsUseEntity[]>} A promise that resolves to an array of `PartsUseEntity` objects.
   */
  async getPartsUse(): Promise<PartsUseEntity[]> {
    return this.listRepository.getPartsUse();
  }

  /**
   * Retrieves an array of `CompClassifyEntity` objects from the `ListRepository`.
   * @returns {Promise<CompClassifyEntity[]>} A promise that resolves to an array of `CompClassifyEntity` objects.
   */
  async getCompClassify(): Promise<CompClassifyEntity[]> {
    return this.listRepository.getCompClassify();
  }

  /**
   * Retrieves an array of `ProcessEntity` objects from the `ListRepository`.
   * @returns {Promise<ProcessEntity[]>} A promise that resolves to an array of `ProcessEntity` objects.
   */
  async getProcess(): Promise<ProcessEntity[]> {
    return this.listRepository.getProcess();
  }

  /**
   * Retrieves an array of `MachineEntity` objects from the `ListRepository`.
   * @returns {Promise<MachineEntity[]>} A promise that resolves to an array of `MachineEntity` objects.
   */
  async getMachine(): Promise<MachineEntity[]> {
    return this.listRepository.getMachine();
  }

  /**
   * Retrieves an array of `CompanyEntity` objects from the `ListRepository`.
   * @returns {Promise<CompanyEntity[]>} A promise that resolves to an array of `CompanyEntity` objects.
   */
  async getCompany(): Promise<CompanyEntity[]> {
    return this.listRepository.getCompany();
  }
}
