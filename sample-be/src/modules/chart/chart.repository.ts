import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { GetDetailFlowerDto } from "./dto/get-detail-flower.dto";
import { GetListFlowerDto } from "./dto/get-list-flower.dto";

@Injectable()
export class ChartRepository {
  private readonly dataSource: DataSource;
  constructor(dataSource: DataSource) {
    this.dataSource = dataSource;
  }

  /**
   * Retrieves a list of flowers with their corresponding flower company, alive status, and count.
   *
   * @returns {Promise<GetListFlowerDto>} A promise that resolves to a list of flowers with their details.
   */
  async getFlowerList(): Promise<GetListFlowerDto> {
    return this.dataSource.query(
      `
      SELECT p.flowerCompKey,
             c.flowerCompName,
             l.alive,
             COUNT(*) AS num
      FROM W_flowerledger l
      JOIN W_flowerorder o ON o.OrderKey = l.OrderKey
      JOIN W_flowerpotinf p ON p.flowerpotkey = o.flowerpotkey
      JOIN W_flowercomp c ON c.flowercompkey = p.flowercompkey
      GROUP BY p.flowercompkey, c.flowercompname, l.alive
      ORDER BY c.flowerCompName
    `
    );
  }
  /**
   * Retrieves detailed information about a specific flower, including the flower company name, alive status, order date, discard date, flower pot name, and flower pot price.
   *
   * @param flowerCompKey - The key of the flower company to retrieve details for.
   * @param alive - The alive status of the flower (0 for dead, 1 for alive).
   * @returns A promise that resolves to a `GetDetailFlowerDto` object containing the requested flower details.
   */
  async getDetail(
    flowerCompKey: number,
    alive: number
  ): Promise<GetDetailFlowerDto> {
    return this.dataSource.query(
      `SELECT 
      c.flowerCompName, l.alive, o.orderDate, l.discardDate, p.flowerPotName, p.flowerPotPrice
      FROM W_flowerledger l
      JOIN W_flowerorder o ON o.OrderKey = l.OrderKey
      JOIN W_flowerpotinf p ON p.flowerpotkey = o.flowerpotkey
      JOIN W_flowercomp c ON c.flowercompkey = p.flowercompkey
      WHERE p.flowercompkey = @0 AND l.alive = @1
      order by c.flowerCompName`,
      [flowerCompKey, alive]
    );
  }
}
