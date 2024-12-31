import { Injectable } from "@nestjs/common";
import Express from "express";
import { DataSource, In, Repository } from "typeorm";
import { UserDto } from "../user/dto/user.dto";
import { CreateCompanyDto } from "./dto/create-company.dto";
import { UpdateCompanyDto } from "./dto/update-company.dto";
import { UploadImageDto } from "./dto/upload-image.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { CompanyEntity } from "../../entities/company.entity";
import { CompanyImageEntity } from "../../entities/company-image.entity";
import { BatchInsertDto } from "./dto/batch-insert.dto";
import { Transactional } from "typeorm-transactional";

@Injectable()
export class CompanyRepository {
  private readonly dataSource: DataSource;
  constructor(
    dataSource: DataSource,
    @InjectRepository(CompanyEntity)
    private readonly companyRepository: Repository<CompanyEntity>,
    @InjectRepository(CompanyImageEntity)
    private readonly companyImageRepository: Repository<CompanyImageEntity>
  ) {
    this.dataSource = dataSource;
  }

  /**
   * Retrieves the next key value for the specified key from the database.
   *
   * @param key - The key for which to retrieve the next value.
   * @returns - A Promise that resolves with the next key value.
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
   * Retrieves a list of all companies that have not been deleted, ordered by company key in descending order.
   *
   * @returns - A Promise that resolves with an array of `CompanyEntity` objects representing the retrieved companies.
   */
  async getListCompany(): Promise<CompanyEntity[]> {
    return this.companyRepository.find({
      where: { isDelete: false },
      order: { compKey: "DESC" },
    });
  }

  /**
   * Retrieves the latest company image for the specified company key.
   *
   * @param compKey - The company key for which to retrieve the latest image.
   * @returns - A Promise that resolves with the latest `CompanyImageEntity` for the specified company.
   */
  async getCompanyImage(compKey: number): Promise<CompanyImageEntity> {
    return this.companyImageRepository.findOne({
      where: { compKey },
      order: { createDtm: "DESC" },
    });
  }

  /**
   * Creates a new company in the database.
   *
   * @param body - An object containing the details of the new company to create.
   * @param user - The user object associated with the create operation.
   * @returns - A Promise that resolves with an object containing the newly created company's key.
   */
  async createCompany(
    body: CreateCompanyDto,
    user: UserDto
  ): Promise<{ compKey: number }> {
    const compKey = await this.getNextKey("CompKey");
    await this.companyRepository.save({
      ...body,
      compKey,
      createId: user.userId,
      createDtm: new Date(),
    });
    return { compKey };
  }

  /**
   * Updates an existing company in the database.
   *
   * @param body - An object containing the updated company details, including the company key.
   * @param user - The user object associated with the update operation.
   * @returns - A Promise that resolves when the company update is complete.
   */
  async updateCompany(body: UpdateCompanyDto, user: UserDto): Promise<void> {
    await this.companyRepository.update(
      { compKey: body.compKey },
      {
        ...body,
        createId: user.userId,
        createDtm: new Date(),
      }
    );
  }

  /**
   * Uploads an image for a company.
   *
   * @param body - An object containing the company key for which the image is being uploaded.
   * @param file - The uploaded image file.
   * @param user - The user object associated with the upload operation.
   * @returns - A Promise that resolves when the image upload is complete.
   */
  async uploadImage(
    body: UploadImageDto,
    file: Express.Multer.File,
    user: UserDto
  ): Promise<void> {
    await this.companyImageRepository.save({
      image: file.buffer,
      compKey: body.compKey,
      createId: user.userId,
      createDtm: new Date(),
    });
  }

  /**
   * Batch inserts an array of companies into the database.
   *
   * @param dto - An object containing an array of companies to insert.
   * @param user - The user object associated with the insert operation.
   * @returns - A Promise that resolves when the batch insert operation is complete.
   */
  @Transactional()
  async batchInsert(dto: BatchInsertDto, user: UserDto) {
    const companies = dto.singleInsert.map((company) => ({
      ...company,
      createId: user.userId,
      createDtm: new Date(),
    }));

    await this.companyRepository.delete({});
    await this.companyRepository.save(companies);
  }
}
