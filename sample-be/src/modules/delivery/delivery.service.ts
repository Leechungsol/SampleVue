import { Injectable } from "@nestjs/common";
import { DeliveryRepository } from "./delivery.repository";
import { GetProcessDto } from "./dto/get-process.dto";
import { SearchQueryDto } from "./dto/search-query.dto";
@Injectable()
export class DeliveryService {
  constructor(private readonly deliveryRepository: DeliveryRepository) {}

  /// Searches for delivery records within the specified date range.
  ///
  /// @param from - The start date of the search range.
  /// @param to - The end date of the search range.
  /// @returns A promise that resolves to a SearchQueryDto containing the search results.
  async searchQuery(from: Date, to: Date): Promise<SearchQueryDto> {
    return this.deliveryRepository.searchQuery(from, to);
  }

  /// Gets the delivery process by the provided explain key.
  ///
  /// @param explainKey - The explain key to retrieve the delivery process for.
  /// @returns A promise that resolves to the GetProcessDto containing the delivery process details.
  async getProcessByExplainKey(explainKey: number): Promise<GetProcessDto> {
    return this.deliveryRepository.getProcessByExplainKey(explainKey);
  }
}
