import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductEntity } from "../../entities/product.entity";
import { PartsTypeEntity } from "../../entities/parts-type.entity";
import { PartsColorEntity } from "../../entities/parts-color.entity";
import { PartsUseEntity } from "../../entities/parts-use.entity";
import { CompClassifyEntity } from "../../entities/comp-classify.entity";
import { ProcessEntity } from "../../entities/process.entity";
import { MachineEntity } from "../../entities/machine.entity";
import { CompanyEntity } from "../../entities/company.entity";

@Injectable()
export class ListRepository {
  private readonly dataSource: DataSource;
  constructor(
    dataSource: DataSource,
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(PartsTypeEntity)
    private readonly partsTypeRepository: Repository<PartsTypeEntity>,
    @InjectRepository(PartsColorEntity)
    private readonly partsColorRepository: Repository<PartsColorEntity>,
    @InjectRepository(PartsUseEntity)
    private readonly partsUseRepository: Repository<PartsUseEntity>,
    @InjectRepository(CompClassifyEntity)
    private readonly compClassifyRepository: Repository<CompClassifyEntity>,
    @InjectRepository(ProcessEntity)
    private readonly processRepository: Repository<ProcessEntity>,
    @InjectRepository(MachineEntity)
    private readonly machineRepository: Repository<MachineEntity>,
    @InjectRepository(CompanyEntity)
    private readonly companyRepository: Repository<CompanyEntity>
  ) {
    this.dataSource = dataSource;
  }

  /// Gets a list of all products.
  ///
  /// @returns A Promise that resolves to an array of ProductEntity objects.
  async getProduct(): Promise<ProductEntity[]> {
    return this.productRepository.find();
  }

  /// Gets a list of all parts types.
  ///
  /// @returns A Promise that resolves to an array of PartsTypeEntity objects.
  async getPartsType(): Promise<PartsTypeEntity[]> {
    return this.partsTypeRepository.find();
  }

  /// Gets a list of all parts colors.
  ///
  /// @returns A Promise that resolves to an array of PartsColorEntity objects.
  async getPartsColor(): Promise<PartsColorEntity[]> {
    return this.partsColorRepository.find();
  }

  /// Gets a list of all parts uses.
  ///
  /// @returns A Promise that resolves to an array of PartsUseEntity objects.
  async getPartsUse(): Promise<PartsUseEntity[]> {
    return this.partsUseRepository.find();
  }

  /// Gets a list of all component classifications.
  ///
  /// @returns A Promise that resolves to an array of CompClassifyEntity objects.
  async getCompClassify(): Promise<CompClassifyEntity[]> {
    return this.compClassifyRepository.find();
  }

  /// Gets a list of all processes.
  ///
  /// @returns A Promise that resolves to an array of ProcessEntity objects.
  async getProcess(): Promise<ProcessEntity[]> {
    return this.processRepository.find();
  }

  /// Gets a list of all machines.
  ///
  /// @returns A Promise that resolves to an array of MachineEntity objects.
  async getMachine(): Promise<MachineEntity[]> {
    return this.machineRepository.find();
  }

  /// Gets a list of all companies.
  ///
  /// @returns A Promise that resolves to an array of CompanyEntity objects.
  async getCompany(): Promise<CompanyEntity[]> {
    return this.companyRepository.find();
  }
}
