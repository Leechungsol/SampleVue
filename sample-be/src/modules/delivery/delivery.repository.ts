import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { GetProcessDto } from "./dto/get-process.dto";
import { SearchQueryDto } from "./dto/search-query.dto";

@Injectable()
/**
 * The `DeliveryRepository` class provides methods for searching and retrieving delivery-related data from the database.
 */
export class DeliveryRepository {
  private readonly dataSource: DataSource;
  constructor(dataSource: DataSource) {
    this.dataSource = dataSource;
  }
  /**
   * Searches for delivery-related data within a specified date range.
   *
   * @param from - The start date of the search range.
   * @param to - The end date of the search range.
   * @returns A promise that resolves to a `SearchQueryDto` object containing the search results.
   */
  async searchQuery(from: Date, to: Date): Promise<SearchQueryDto> {
    const queryData = `
        SELECT 
          a.explainKey,
          compClassify,
          orderCompKey,
          orderDate,
          orderQuantity,
          goodsCost,
          goodsName,
          orderAmount,
          finalDueCompKey,
          finalDueDate,
          standard,
          reference,
          director,
          isDelete,
          ISNULL(isFinalDueMin, 0) isFinalDueMin,
          ISNULL(isFinalDueMax, 0) isFinalDueMax,
          ISNULL(isDefect, 0) isDefect,
          CASE
            WHEN isFinalDueMin = 3 THEN '완료'
            WHEN isFinalDueMax > 1 THEN '진행중'
            ELSE ' '
          END isOrder,
          CASE
            WHEN isFinalDueMin = 3 THEN '90'
            WHEN f.cnt > 0 THEN '50'
            WHEN e.cnt > 0 THEN '40'
            WHEN d.cnt > 0 THEN '30'
            WHEN c.cnt > 0 THEN '20'
            WHEN isFinalDueMax > 1 THEN '10'
            ELSE '0'
          END [status],
          clientStandard,
          clientDescr
        FROM Instruction a
        LEFT JOIN (
          SELECT 
            ExplainKey,
            MIN(isFinalDueMin) AS isFinalDueMin,
            MAX(isFinalDueMax) AS isFinalDueMax
          FROM (
            SELECT 
              ExplainKey,
              CASE
                WHEN ProcessCode = 2147483647 THEN (
                  MIN(CASE
                    WHEN ItemKey = 0 THEN 1
                    ELSE (
                      CASE
                        WHEN ReceivingQuantity > FinalDueQuantity THEN 2
                        ELSE 3
                      END
                    )
                  END)
                )
                ELSE 4
              END AS isFinalDueMin,
              MAX(CASE
                WHEN ItemKey = 0 THEN 1
                ELSE (
                  CASE
                    WHEN ReceivingQuantity > FinalDueQuantity THEN 2
                    ELSE 3
                  END
                )
              END) AS isFinalDueMax
            FROM (
              SELECT 
                ExplainKey,
                ProcessCode,
                ISNULL(ItemKey, 0) AS ItemKey,
                ISNULL(ReceivingQuantity, 0) AS ReceivingQuantity,
                ISNULL(FinalDueQuantity, 0) AS FinalDueQuantity
              FROM ViewAllInstructionData
            ) a
            GROUP BY ExplainKey, ProcessCode
          ) x
          GROUP BY ExplainKey
        ) b ON a.ExplainKey = b.ExplainKey
        LEFT JOIN (
          SELECT 
            a.ExplainKey,
            COUNT(*) cnt
          FROM DetailInstruction a
          JOIN DetailItem b ON a.DetailKey = b.DetailKey
          JOIN WorkProgress e ON b.ItemKey = e.ItemKey AND e.IOType = '1'
          WHERE 1 = 1
            AND (a.Vender = '0' OR a.Vender = '1')
            AND IOQuantity >= ReceivingQuantity
            AND a.ProcessCode <> 2147483647
          GROUP BY a.ExplainKey
        ) c ON a.ExplainKey = c.ExplainKey
        LEFT JOIN (
          SELECT 
            a.ExplainKey,
            COUNT(*) cnt
          FROM DetailInstruction a
          JOIN Process b ON a.ProcessCode = b.ProcessCode AND b.ProcessName LIKE '%코팅%'
          WHERE a.OutsourcingEndDate IS NOT NULL
          GROUP BY a.ExplainKey
        ) d ON a.ExplainKey = d.ExplainKey
        LEFT JOIN (
          SELECT 
            a.ExplainKey,
            COUNT(*) cnt
          FROM DetailInstruction a
          JOIN Process b ON a.ProcessCode = b.ProcessCode AND b.ProcessName LIKE '%인쇄%'
          WHERE a.OutsourcingEndDate IS NOT NULL
          GROUP BY a.ExplainKey
        ) e ON a.ExplainKey = e.ExplainKey
        LEFT JOIN (
          SELECT 
            a.ExplainKey,
            COUNT(*) cnt
          FROM DetailInstruction a
          JOIN DetailItem b ON a.DetailKey = b.DetailKey
          JOIN WorkProgress e ON b.ItemKey = e.ItemKey AND e.IOType = '0'
          WHERE 1 = 1
            AND (b.Receiving = '0' OR b.Receiving = '1')
            AND IOQuantity >= ReceivingQuantity
            AND a.ProcessCode <> 2147483647
          GROUP BY a.ExplainKey
        ) f ON a.ExplainKey = f.ExplainKey
        WHERE 1 = 1
          AND isDelete <> 1
          AND OrderDate BETWEEN @0 AND @1
        ORDER BY OrderDate DESC, a.ExplainKey DESC 
      `;

    return this.dataSource.query(queryData, [from, to]);
  }

  /**
   * Retrieves the process details for the specified explainKey.
   *
   * @param explainKey - The explainKey to retrieve the process details for.
   * @returns A promise that resolves to a `GetProcessDto` object containing the process details.
   */
  async getProcessByExplainKey(explainKey: number): Promise<GetProcessDto> {
    const queryData = `
        SELECT
          detailKey,
          itemKey,
          partsKey,
          colorKey,
          useKey,
          receiving,
          receivingQuantity,
          ISNULL(Quantity, 0) AS quantity,
          (ReceivingQuantity - Quantity) AS balanceQuantity,
          descr,
          explainKey,
          processCode,
          vender,
          processExplain
        FROM (
          SELECT
            a.DetailKey,
            a.ItemKey,
            PartsKey,
            ColorKey,
            UseKey,
            Receiving,
            ReceivingQuantity,
            ISNULL(Quantity, 0) AS Quantity,
            Descr,
            ExplainKey,
            ProcessCode,
            Vender,
            ProcessExplain
          FROM (
            SELECT
              DetailKey,
              ItemKey,
              PartsKey,
              ColorKey,
              UseKey,
              Receiving,
              ReceivingQuantity,
              Descr
            FROM DetailItem
            WHERE DetailKey IN (
              SELECT DetailKey
              FROM DetailInstruction
              WHERE ExplainKey = @0
            )
          ) a
          LEFT JOIN (
            SELECT
              DetailKey,
              ExplainKey,
              ProcessExplain,
              ProcessCode,
              Vender
            FROM DetailInstruction
          ) b ON a.DetailKey = b.DetailKey
          LEFT JOIN (
            SELECT
              ItemKey,
              SUM(FinalDueQuantity) AS Quantity
            FROM FinalDue
            GROUP BY ItemKey
          ) e ON a.ItemKey = e.ItemKey
        ) x
        WHERE 1 = 1
          AND ProcessCode = 2147483647 
        ORDER BY DetailKey
      `;

    return this.dataSource.query(queryData, [explainKey]);
  }
}
