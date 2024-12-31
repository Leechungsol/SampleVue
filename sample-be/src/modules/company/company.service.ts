import { Injectable } from "@nestjs/common";
import { UserDto } from "../user/dto/user.dto";
import { CompanyRepository } from "./company.repository";
import { CreateCompanyDto } from "./dto/create-company.dto";
import { GetListCompanyImageDto } from "./dto/get-list-company-image.dto";
import { UpdateCompanyDto } from "./dto/update-company.dto";
import { UploadImageDto } from "./dto/upload-image.dto";
import Express from "express";
import { CompanyEntity } from "../../entities/company.entity";
import { BatchInsertDto } from "./dto/batch-insert.dto";

@Injectable()
/**
 * Provides methods for managing companies, including retrieving a list of all companies, getting company images, creating new companies, updating existing companies, and uploading images for companies.
 */
export class CompanyService {
  constructor(private readonly companyRepository: CompanyRepository) {}

  /**
   * Retrieves a list of all companies.
   *
   * @returns {Promise<CompanyEntity[]>} A promise that resolves to an array of `CompanyEntity` objects representing all companies.
   */
  async getListCompany(): Promise<CompanyEntity[]> {
    return this.companyRepository.getListCompany();
  }

  /**
   * Retrieves the company image for the specified company key.
   *
   * @param compKey - The company key for which to retrieve the image.
   * @returns A `GetListCompanyImageDto` object containing the company image data.
   */
  async getCompanyImage(compKey: number): Promise<GetListCompanyImageDto> {
    const data = await this.companyRepository.getCompanyImage(compKey);
    return {
      ...data,
      image: data.image.toString("base64"),
    };
  }

  /**
   * Creates a new company with the provided data.
   *
   * @param body - The `CreateCompanyDto` object containing the data for the new company.
   * @param user - The `UserDto` object representing the user creating the company.
   * @returns A promise that resolves to the created `CompanyEntity` object.
   */
  async createCompany(body: CreateCompanyDto, user: UserDto) {
    return this.companyRepository.createCompany(body, user);
  }

  /**
   * Updates an existing company with the provided data.
   *
   * @param body - The `UpdateCompanyDto` object containing the updated data for the company.
   * @param user - The `UserDto` object representing the user updating the company.
   * @returns A promise that resolves to the updated `CompanyEntity` object.
   */
  async updateCompany(body: UpdateCompanyDto, user: UserDto) {
    return this.companyRepository.updateCompany(body, user);
  }

  /**
   * Uploads an image for a company.
   *
   * @param body - The `UploadImageDto` object containing the data for the image to be uploaded.
   * @param file - The Express Multer file object containing the image data.
   * @param user - The `UserDto` object representing the user uploading the image.
   * @returns A promise that resolves to the result of the image upload operation.
   */
  async uploadImage(
    body: UploadImageDto,
    file: Express.Multer.File,
    user: UserDto
  ) {
    return this.companyRepository.uploadImage(body, file, user);
  }

  /**
   * Batch inserts a set of companies with the provided data.
   *
   * @param body - The `BatchInsertDto` object containing the data for the companies to be inserted.
   * @param user - The `UserDto` object representing the user performing the batch insert operation.
   * @returns A promise that resolves to the result of the batch insert operation.
   */
  async batchInsert(body: BatchInsertDto, user: UserDto) {
    return this.companyRepository.batchInsert(body, user);
  }
}
