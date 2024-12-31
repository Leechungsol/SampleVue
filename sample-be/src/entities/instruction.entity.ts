import { Column, Entity, Index } from "typeorm";

@Index("Instruction_PK", ["explainKey"], { unique: true })
@Index("IX01_Instruction", ["orderDate"], {})
@Index("IX02_Instruction", ["goodsName"], {})
@Index("IX03_Instruction", ["orderCompKey"], {})
@Index("IX04_Instruction", ["compClassify"], {})
@Entity("Instruction", { schema: "dbo" })
export class InstructionEntity {
  @Column("int", { primary: true, name: "ExplainKey" })
  explainKey: number;

  @Column("nvarchar", { name: "CompClassify", length: 50 })
  compClassify: string;

  @Column("int", { name: "OrderCompKey" })
  orderCompKey: number;

  @Column("nvarchar", { name: "OrderDate", nullable: true, length: 10 })
  orderDate: string | null;

  @Column("int", { name: "OrderQuantity", nullable: true })
  orderQuantity: number | null;

  @Column("int", { name: "GoodsCost", nullable: true })
  goodsCost: number | null;

  @Column("nvarchar", { name: "GoodsName", nullable: true, length: 50 })
  goodsName: string | null;

  @Column("int", { name: "OrderAmount", nullable: true })
  orderAmount: number | null;

  @Column("int", { name: "FinalDueCompKey", nullable: true })
  finalDueCompKey: number | null;

  @Column("nvarchar", { name: "FinalDueDate", nullable: true, length: 10 })
  finalDueDate: string | null;

  @Column("nvarchar", { name: "Standard", nullable: true, length: 50 })
  standard: string | null;

  @Column("bit", { name: "isTax", nullable: true })
  isTax: boolean | null;

  @Column("int", { name: "TaxAmount", nullable: true })
  taxAmount: number | null;

  @Column("bit", { name: "isClose", nullable: true })
  isClose: boolean | null;

  @Column("nvarchar", { name: "Reference", nullable: true, length: 500 })
  reference: string | null;

  @Column("nvarchar", { name: "Descr", nullable: true, length: 500 })
  descr: string | null;

  @Column("bit", { name: "isDelete", nullable: true })
  isDelete: boolean | null;

  @Column("nvarchar", { name: "CreateID", nullable: true, length: 50 })
  createId: string | null;

  @Column("smalldatetime", { name: "CreateDtm", nullable: true })
  createDtm: Date | null;

  @Column("bit", { name: "isDefect", nullable: true })
  isDefect: boolean | null;

  @Column("nvarchar", { name: "ClientStandard", nullable: true, length: 50 })
  clientStandard: string | null;

  @Column("nvarchar", { name: "ClientDescr", nullable: true, length: 500 })
  clientDescr: string | null;

  @Column("nvarchar", { name: "Director", nullable: true, length: 30 })
  director: string | null;

  @Column("bit", { name: "isSample", nullable: true })
  isSample: boolean | null;

  @Column("nvarchar", { name: "SupplyDate", nullable: true, length: 10 })
  supplyDate: string | null;

  @Column("int", { name: "SupplyQuantity", nullable: true })
  supplyQuantity: number | null;

  @Column("int", { name: "SupplyAmount", nullable: true })
  supplyAmount: number | null;
}
