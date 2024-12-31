import { Column, Entity, Index } from "typeorm";

@Index("IX01_Ledger", ["compKey"], {})
@Index("IX02_Ledger", ["ledgerDate"], {})
@Index("IX03_Ledger", ["compClassify"], {})
@Index("Ledger_PK", ["ledgerKey"], { unique: true })
@Entity("Ledger", { schema: "dbo" })
export class LedgerEntity {
  @Column("int", { primary: true, name: "LedgerKey" })
  ledgerKey: number;

  @Column("nvarchar", { name: "CompClassify", length: 50 })
  compClassify: string;

  @Column("int", { name: "CompKey" })
  compKey: number;

  @Column("nvarchar", { name: "Title", nullable: true, length: 50 })
  title: string | null;

  @Column("nvarchar", { name: "LedgerDate", nullable: true, length: 10 })
  ledgerDate: string | null;

  @Column("bit", { name: "isBuySale", nullable: true })
  isBuySale: boolean | null;

  @Column("int", { name: "Quantity", nullable: true })
  quantity: number | null;

  @Column("int", { name: "Cost", nullable: true })
  cost: number | null;

  @Column("int", { name: "Amount", nullable: true })
  amount: number | null;

  @Column("bit", { name: "isTax", nullable: true })
  isTax: boolean | null;

  @Column("int", { name: "TaxAmount", nullable: true })
  taxAmount: number | null;

  @Column("nvarchar", { name: "Reference", nullable: true, length: 500 })
  reference: string | null;

  @Column("nvarchar", { name: "Other1", nullable: true, length: 500 })
  other1: string | null;

  @Column("nvarchar", { name: "Other2", nullable: true, length: 500 })
  other2: string | null;

  @Column("nvarchar", { name: "Other3", nullable: true, length: 500 })
  other3: string | null;

  @Column("nvarchar", { name: "Descr", nullable: true, length: 500 })
  descr: string | null;

  @Column("nvarchar", { name: "CreateID", nullable: true, length: 50 })
  createId: string | null;

  @Column("smalldatetime", { name: "CreateDtm", nullable: true })
  createDtm: Date | null;
}
