import { Column, Entity, Index } from "typeorm";

@Index("ClosedSales_PK", ["explainKey", "closeMonth"], { unique: true })
@Index("IX01_ClosedSales", ["closeMonth"], {})
@Entity("ClosedSales", { schema: "dbo" })
export class ClosedSalesEntity {
  @Column("int", { primary: true, name: "ExplainKey" })
  explainKey: number;

  @Column("nvarchar", { primary: true, name: "CloseMonth", length: 7 })
  closeMonth: string;

  @Column("int", { name: "CloseQuantity", nullable: true })
  closeQuantity: number | null;

  @Column("int", { name: "CloseCost", nullable: true })
  closeCost: number | null;

  @Column("int", { name: "CloseAmount", nullable: true })
  closeAmount: number | null;

  @Column("bit", { name: "isTax", nullable: true })
  isTax: boolean | null;

  @Column("int", { name: "TaxAmount", nullable: true })
  taxAmount: number | null;

  @Column("nvarchar", { name: "Descr", nullable: true, length: 500 })
  descr: string | null;

  @Column("nvarchar", { name: "CreateID", nullable: true, length: 50 })
  createId: string | null;

  @Column("smalldatetime", { name: "CreateDtm", nullable: true })
  createDtm: Date | null;
}
