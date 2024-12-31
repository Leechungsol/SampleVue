import { Injectable } from "@nestjs/common";
import { GetProcessDto } from "./dto/get-process.dto";
import { UnshippedRepository } from "./unshipped.repository";
@Injectable()
export class UnshippedService {
  constructor(private readonly unshippedRepository: UnshippedRepository) {}

  /**
   * Retrieves the process data for a given date range and receiving number.
   *
   * @param from - The start date of the date range.
   * @param to - The end date of the date range.
   * @param receiving - The receiving number to filter the process data.
   * @returns A `GetProcessDto` object containing the process data.
   */
  async getProcess(from: Date, to: Date, receiving: number): Promise<GetProcessDto> {
    return this.unshippedRepository.getProcess(from, to, receiving);
  }
}
