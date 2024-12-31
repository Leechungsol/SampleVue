import { Injectable } from "@nestjs/common";
import { isNumber } from "class-validator";
import { DataSource } from "typeorm";
import { GetProcessDto } from "./dto/get-process.dto";

@Injectable()
export class UnshippedRepository {
  private readonly dataSource: DataSource;
  constructor(dataSource: DataSource) {
    this.dataSource = dataSource;
  }

  /**
   * Retrieves process data for a given date range and receiving number.
   *
   * @param from - The start date of the date range.
   * @param to - The end date of the date range.
   * @param receiving - The receiving number to filter by.
   * @returns A `GetProcessDto` object containing the retrieved process data.
   */
  async getProcess(
    from: Date,
    to: Date,
    receiving: number
  ): Promise<GetProcessDto> {
    const queryData = `
      SELECT
        i.explainKey,
        i.orderDate,
        i.orderCompKey,
        i.goodsName,
        dii.receiving,
        dii.partsKey,
        dii.colorKey,
        dii.useKey,
        dii.receivingQuantity,
        ISNULL(wp.Quantity, 0) quantity,
        dii.ReceivingQuantity - ISNULL(wp.Quantity, 0) AS balanceQuantity,
        dii.descr
      FROM Instruction i
      JOIN DetailInstruction di ON i.ExplainKey = di.ExplainKey
      JOIN DetailItem dii ON di.DetailKey = dii.DetailKey
      LEFT JOIN (
        SELECT
          ItemKey,
          SUM(IOQuantity) AS Quantity
        FROM WorkProgress
        WHERE IOType = '1'
        GROUP BY ItemKey, IOType
      ) wp ON dii.ItemKey = wp.ItemKey
      WHERE (di.Vender = '0' OR Vender = '1')
        AND ISNULL(wp.Quantity, 0) < dii.ReceivingQuantity
        AND di.ProcessCode <> '2147483647'
        AND dii.PartsKey NOT IN ('95', '99')
        AND i.OrderDate BETWEEN @0 AND @1
        ${isNumber(receiving) ? "AND dii.receiving = @2" : ""}
      ORDER BY i.OrderDate
    `;

    return this.dataSource.query(queryData, [from, to, receiving]);
  }
}
