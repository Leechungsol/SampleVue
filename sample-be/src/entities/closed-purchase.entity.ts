import { Column, Entity, Index } from "typeorm";

@Index("ClosedPurchase_PK", ["closeMonth", "detailKey"], { unique: true })
@Index("IX01_ClosedPurchase", ["closeMonth"], {})
@Entity("ClosedPurchase", { schema: "dbo" })
export class ClosedPurchaseEntity {
  @Column("int", { primary: true, name: "DetailKey" })
  detailKey: number;

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
