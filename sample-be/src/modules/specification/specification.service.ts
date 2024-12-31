import { Injectable } from "@nestjs/common";
import { GetDetailDto } from "./dto/get-detail.dto";
import { GetFilesDto } from "./dto/get-files.dto";
import { SearchQueryDto } from "./dto/search-query.dto";
import { SpecificationRepository } from "./specification.repository";
@Injectable()
export class SpecificationService {
  constructor(
    private readonly specificationRepository: SpecificationRepository
  ) {}

  /**
   * Retrieves a search query result based on the provided date range.
   *
   * @param from - The start date of the search query.
   * @param to - The end date of the search query.
   * @returns A `SearchQueryDto` object containing the search query result.
   */
  async searchQuery(from: Date, to: Date): Promise<SearchQueryDto> {
    return this.specificationRepository.getByOrderDate(from, to);
  }

  /**
   * Retrieves the detail of a specification based on the provided explainKey.
   *
   * @param explainKey - The explainKey to retrieve the specification detail for.
   * @returns A `SearchQueryDto` object containing the specification detail.
   */
  async getDetail(explainKey: number): Promise<SearchQueryDto> {
    return this.specificationRepository.getDetail(explainKey);
  }

  /**
   * Retrieves the detail of a specification based on the provided explainKey.
   *
   * @param explainKey - The explainKey to retrieve the specification detail for.
   * @returns A `GetDetailDto` object containing the specification detail.
   */
  async getByExplainKey(explainKey: number): Promise<GetDetailDto> {
    return this.specificationRepository.getByExplainKey(explainKey);
  }

  /**
   * Retrieves the files associated with the specified explainKey.
   *
   * @param explainKey - The explainKey to retrieve the files for.
   * @returns A `GetFilesDto` object containing the files.
   */
  async getFiles(explainKey: number): Promise<GetFilesDto> {
    return this.specificationRepository.getFiles(explainKey);
  }
}
