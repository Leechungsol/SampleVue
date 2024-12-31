import { ChartRepository } from "./chart.repository";
import { Injectable } from "@nestjs/common";
import { GetListFlowerDto } from "./dto/get-list-flower.dto";
import { GetDetailFlowerDto } from "./dto/get-detail-flower.dto";

@Injectable()
/// Provides methods for retrieving information about flowers.
///
/// This service interacts with the `ChartRepository` to fetch data about flowers, including the list of flowers and the details of a specific flower.
///
/// The `getFlowerList` method returns a promise that resolves to a `GetListFlowerDto` object containing the list of flowers.
///
/// The `getDetail` method takes a flower's unique identifier (`flowerCompKey`) and a flag indicating whether to retrieve details for a living or dead flower (`alive`), and returns a promise that resolves to a `GetDetailFlowerDto` object containing the details of the flower.
export class ChartService {
  constructor(private readonly chartRepository: ChartRepository) {}

  /// Gets the list of flowers.
  ///
  /// @returns A promise that resolves to a `GetListFlowerDto` object containing the list of flowers.
  async getFlowerList(): Promise<GetListFlowerDto> {
    return this.chartRepository.getFlowerList();
  }

  /// Gets the details of a flower.
  ///
  /// @param flowerCompKey The unique identifier of the flower.
  /// @param alive A flag indicating whether to retrieve details for a living or dead flower.
  /// @returns A promise that resolves to a `GetDetailFlowerDto` object containing the details of the flower.
  async getDetail(
    flowerCompKey: number,
    alive: number
  ): Promise<GetDetailFlowerDto> {
    return this.chartRepository.getDetail(flowerCompKey, alive);
  }
}
