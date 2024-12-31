import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { GetDetailDto } from "./dto/get-detail.dto";
import { GetFilesDto } from "./dto/get-files.dto";
import { SearchQueryDto } from "./dto/search-query.dto";

@Injectable()
export class SpecificationRepository {
  private readonly dataSource: DataSource;
  constructor(dataSource: DataSource) {
    this.dataSource = dataSource;
  }

  /**
   * Retrieves search results based on the provided order date range.
   *
   * @param from - The start date of the order date range.
   * @param to - The end date of the order date range.
   * @returns A promise that resolves to a `SearchQueryDto` object containing the search results.
   */
  async getByOrderDate(from: Date, to: Date): Promise<SearchQueryDto> {
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
      FROM
        Instruction a
      LEFT JOIN (
        SELECT
          ExplainKey,
          MIN(isFinalDueMin) AS isFinalDueMin,
          MAX(isFinalDueMax) AS isFinalDueMax
        FROM (
          SELECT
            ExplainKey,
            CASE 
              WHEN ProcessCode = 2147483647 
              THEN (MIN(CASE WHEN ItemKey = 0 THEN 1 ELSE (CASE WHEN ReceivingQuantity > FinalDueQuantity THEN 2 ELSE 3 END) END)) 
              ELSE 4
            END AS isFinalDueMin,
            MAX(CASE 
              WHEN ItemKey = 0 THEN 1
              ELSE (CASE WHEN ReceivingQuantity > FinalDueQuantity THEN 2 ELSE 3 END)
            END) AS isFinalDueMax
          FROM (
            SELECT
              ExplainKey,
              ProcessCode,
              ISNULL(ItemKey, 0) AS ItemKey,
              ISNULL(ReceivingQuantity, 0) AS ReceivingQuantity,
              ISNULL(FinalDueQuantity, 0) AS FinalDueQuantity
            FROM
              ViewAllInstructionData
          ) a
          GROUP BY
            ExplainKey,
            ProcessCode
        ) x
        GROUP BY
          ExplainKey
      ) b ON a.ExplainKey = b.ExplainKey
      LEFT JOIN (
        SELECT
          a.ExplainKey,
          COUNT(*) cnt
        FROM
          DetailInstruction a
        JOIN DetailItem b ON a.DetailKey = b.DetailKey
        JOIN WorkProgress e ON b.ItemKey = e.ItemKey
          AND e.IOType = '1'
        WHERE
          1 = 1
          AND (a.Vender = '0' OR a.Vender = '1')
          AND IOQuantity >= ReceivingQuantity
          AND a.ProcessCode <> 2147483647
        GROUP BY
          a.ExplainKey
      ) c ON a.ExplainKey = c.ExplainKey
      LEFT JOIN (
        SELECT
          a.ExplainKey,
          COUNT(*) cnt
        FROM
          DetailInstruction a
        JOIN Process b ON a.ProcessCode = b.ProcessCode
          AND b.ProcessName LIKE '%코팅%'
        WHERE
          a.OutsourcingEndDate IS NOT NULL
        GROUP BY
          a.ExplainKey
      ) d ON a.ExplainKey = d.ExplainKey
      LEFT JOIN (
        SELECT
          a.ExplainKey,
          COUNT(*) cnt
        FROM
          DetailInstruction a
        JOIN Process b ON a.ProcessCode = b.ProcessCode
          AND b.ProcessName LIKE '%인쇄%'
        WHERE
          a.OutsourcingEndDate IS NOT NULL
        GROUP BY
          a.ExplainKey
      ) e ON a.ExplainKey = e.ExplainKey
      LEFT JOIN (
        SELECT
          a.ExplainKey,
          COUNT(*) cnt
        FROM
          DetailInstruction a
        JOIN DetailItem b ON a.DetailKey = b.DetailKey
        JOIN WorkProgress e ON b.ItemKey = e.ItemKey
          AND e.IOType = '0'
        WHERE
          1 = 1
          AND (b.Receiving = '0' OR b.Receiving = '1')
          AND IOQuantity >= ReceivingQuantity
          AND a.ProcessCode <> 2147483647
        GROUP BY
          a.ExplainKey
      ) f ON a.ExplainKey = f.ExplainKey
      WHERE
        1 = 1
        AND isDelete <> 1
        AND OrderDate BETWEEN @0 AND @1
      ORDER BY
        OrderDate DESC,
        a.ExplainKey DESC
    `;
    return this.dataSource.query(queryData, [from, to]);
  }

  /**
   * Retrieves detailed information about a specific instruction based on the provided `explainKey`.
   *
   * @param explainKey - The unique identifier for the explanation.
   * @returns A promise that resolves to a `SearchQueryDto` object containing the detailed instruction information.
   */
  async getDetail(explainKey: number): Promise<SearchQueryDto> {
    const queryData = `
      SELECT TOP 1
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
      FROM
        Instruction a
      LEFT JOIN (
        SELECT
          ExplainKey,
          MIN(isFinalDueMin) AS isFinalDueMin,
          MAX(isFinalDueMax) AS isFinalDueMax
        FROM (
          SELECT
            ExplainKey,
            CASE 
              WHEN ProcessCode = 2147483647 
              THEN (MIN(CASE WHEN ItemKey = 0 THEN 1 ELSE (CASE WHEN ReceivingQuantity > FinalDueQuantity THEN 2 ELSE 3 END) END)) 
              ELSE 4
            END AS isFinalDueMin,
            MAX(CASE 
              WHEN ItemKey = 0 THEN 1
              ELSE (CASE WHEN ReceivingQuantity > FinalDueQuantity THEN 2 ELSE 3 END)
            END) AS isFinalDueMax
          FROM (
            SELECT
              ExplainKey,
              ProcessCode,
              ISNULL(ItemKey, 0) AS ItemKey,
              ISNULL(ReceivingQuantity, 0) AS ReceivingQuantity,
              ISNULL(FinalDueQuantity, 0) AS FinalDueQuantity
            FROM
              ViewAllInstructionData
          ) a
          GROUP BY
            ExplainKey,
            ProcessCode
        ) x
        GROUP BY
          ExplainKey
      ) b ON a.ExplainKey = b.ExplainKey
      LEFT JOIN (
        SELECT
          a.ExplainKey,
          COUNT(*) cnt
        FROM
          DetailInstruction a
        JOIN DetailItem b ON a.DetailKey = b.DetailKey
        JOIN WorkProgress e ON b.ItemKey = e.ItemKey
          AND e.IOType = '1'
        WHERE
          1 = 1
          AND (a.Vender = '0' OR a.Vender = '1')
          AND IOQuantity >= ReceivingQuantity
          AND a.ProcessCode <> 2147483647
        GROUP BY
          a.ExplainKey
      ) c ON a.ExplainKey = c.ExplainKey
      LEFT JOIN (
        SELECT
          a.ExplainKey,
          COUNT(*) cnt
        FROM
          DetailInstruction a
        JOIN Process b ON a.ProcessCode = b.ProcessCode
          AND b.ProcessName LIKE '%코팅%'
        WHERE
          a.OutsourcingEndDate IS NOT NULL
        GROUP BY
          a.ExplainKey
      ) d ON a.ExplainKey = d.ExplainKey
      LEFT JOIN (
        SELECT
          a.ExplainKey,
          COUNT(*) cnt
        FROM
          DetailInstruction a
        JOIN Process b ON a.ProcessCode = b.ProcessCode
          AND b.ProcessName LIKE '%인쇄%'
        WHERE
          a.OutsourcingEndDate IS NOT NULL
        GROUP BY
          a.ExplainKey
      ) e ON a.ExplainKey = e.ExplainKey
      LEFT JOIN (
        SELECT
          a.ExplainKey,
          COUNT(*) cnt
        FROM
          DetailInstruction a
        JOIN DetailItem b ON a.DetailKey = b.DetailKey
        JOIN WorkProgress e ON b.ItemKey = e.ItemKey
          AND e.IOType = '0'
        WHERE
          1 = 1
          AND (b.Receiving = '0' OR b.Receiving = '1')
          AND IOQuantity >= ReceivingQuantity
          AND a.ProcessCode <> 2147483647
        GROUP BY
          a.ExplainKey
      ) f ON a.ExplainKey = f.ExplainKey
      WHERE
        1 = 1
        AND a.ExplainKey = @0
        AND isDelete <> 1
    `;

    const data = await this.dataSource.query(queryData, [explainKey]);
    return data.length > 0 ? data[0] : undefined;
  }

  /**
   * Retrieves detailed information about a specific instruction based on the provided `explainKey`.
   *
   * @param explainKey - The unique identifier for the explanation.
   * @returns A promise that resolves to a `GetDetailDto` object containing the detailed instruction information.
   */
  async getByExplainKey(explainKey: number): Promise<GetDetailDto> {
    const query = `
        SELECT
          detailKey,
          explainKey,
          a.processCode,
          detailSeq,
          detailCost,
          detailQuantity,
          detailAmount,
          processExplain,
          vender,
          c.CompName AS venderName,
          Receiving,
          r.CompName AS receivingName,
          a.partsKey,
          partsName,
          a.colorKey,
          colorName,
          a.useKey,
          useName,
          receivingText,
          orderKey,
          isDelete,
          descr,
          reference,
          processName,
          outsourcingStartDate,
          outsourcingEndDate,
          b.sort
        FROM
          DetailInstruction a
        LEFT JOIN (
          SELECT
            ProcessCode,
            ProcessName,
            Sort
          FROM
            Process
        ) b ON a.ProcessCode = b.ProcessCode
        LEFT JOIN (
          SELECT
            CompKey,
            CompName
          FROM
            Company
        ) c ON a.Vender = c.CompKey
        LEFT JOIN (
          SELECT
            CompKey,
            CompName
          FROM
            Company
        ) r ON a.Receiving = r.CompKey
        LEFT JOIN (
          SELECT
            PartsKey,
            PartsName
          FROM
            PartsType
        ) pt ON a.PartsKey = pt.PartsKey
        LEFT JOIN (
          SELECT
            ColorKey,
            ColorName
          FROM
            PartsColor
        ) pc ON a.ColorKey = pc.ColorKey
        LEFT JOIN (
          SELECT
            UseKey,
            UseName
          FROM
            PartsUse
        ) pu ON a.UseKey = pu.UseKey
        WHERE
          1 = 1
          AND isDelete <> 1
          AND ISNULL(isDefect, 0) <> 1
          AND ExplainKey = @0
          AND a.ProcessCode <> 2147483647
        ORDER BY
          ISNULL(b.Sort, 0),
          a.ProcessCode,
          a.DetailSeq 
      `;
    return this.dataSource.query(query, [explainKey]);
  }

  /**
   * Retrieves a list of files associated with the specified `explainKey`.
   *
   * @param explainKey - The unique identifier for the explanation.
   * @returns A promise that resolves to an array of `GetFilesDto` objects, each containing the file name and the base64-encoded image data.
   */
  async getFiles(explainKey: number): Promise<GetFilesDto> {
    const queryData = `
      SELECT fileName, image 
      FROM InstructionImage 
      WHERE ExplainKey = @0 
      ORDER BY CreateDtm DESC
    `;
    const data = await this.dataSource.query(queryData, [explainKey]);
    return data.map((item: any) => ({
      fileName: item.fileName,
      image: item.image.toString("base64"),
    }));
  }
}
