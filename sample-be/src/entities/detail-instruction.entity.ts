import { Column, Entity, Index } from "typeorm";

@Index("DetailInstruction_PK", ["detailKey"], { unique: true })
@Index("IX01_DetailInstruction", ["vender"], {})
@Index("IX02_DetailInstruction", ["explainKey"], {})
@Index("IX03_DetailInstruction", ["processCode"], {})
@Index("IX04_DetailInstruction", ["orderKey"], {})
@Entity("DetailInstruction", { schema: "dbo" })
export class DetailInstructionEntity {
  @Column("int", { primary: true, name: "DetailKey" })
  detailKey: number;

  @Column("int", { name: "ExplainKey" })
  explainKey: number;

  @Column("int", { name: "ProcessCode" })
  processCode: number;

  @Column("int", { name: "DetailSeq", nullable: true })
  detailSeq: number | null;

  @Column("int", { name: "DetailCost", nullable: true })
  detailCost: number | null;

  @Column("int", { name: "DetailQuantity", nullable: true })
  detailQuantity: number | null;

  @Column("int", { name: "DetailAmount", nullable: true })
  detailAmount: number | null;

  @Column("nvarchar", { name: "ProcessExplain", nullable: true, length: 500 })
  processExplain: string | null;

  @Column("int", { name: "Vender" })
  vender: number;

  @Column("nvarchar", { name: "ReceivingText", nullable: true, length: 500 })
  receivingText: string | null;

  @Column("bit", { name: "isTax", nullable: true })
  isTax: boolean | null;

  @Column("int", { name: "TaxAmount", nullable: true })
  taxAmount: number | null;

  @Column("bit", { name: "isClose", nullable: true })
  isClose: boolean | null;

  @Column("int", { name: "OrderKey" })
  orderKey: number;

  @Column("bit", { name: "isDelete", nullable: true })
  isDelete: boolean | null;

  @Column("nvarchar", { name: "Descr", nullable: true, length: 500 })
  descr: string | null;

  @Column("nvarchar", { name: "Reference", nullable: true, length: 500 })
  reference: string | null;

  @Column("nvarchar", { name: "CreateID", nullable: true, length: 50 })
  createId: string | null;

  @Column("smalldatetime", { name: "CreateDtm", nullable: true })
  createDtm: Date | null;

  @Column("datetime", { name: "OutSourcingStartDate", nullable: true })
  outSourcingStartDate: Date | null;

  @Column("bit", { name: "isDefect", nullable: true })
  isDefect: boolean | null;

  @Column("datetime", { name: "OutsourcingEndDate", nullable: true })
  outsourcingEndDate: Date | null;

  @Column("datetime", { name: "CompletedDtm", nullable: true })
  completedDtm: Date | null;

  @Column("datetime", { name: "DueDtm", nullable: true })
  dueDtm: Date | null;

  @Column("nvarchar", { name: "OrderDescr", nullable: true, length: 500 })
  orderDescr: string | null;

  @Column("int", { name: "PartsKey", nullable: true })
  partsKey: number | null;

  @Column("int", { name: "UseKey", nullable: true })
  useKey: number | null;

  @Column("int", { name: "ColorKey", nullable: true })
  colorKey: number | null;

  @Column("int", { name: "Receiving", nullable: true })
  receiving: number | null;
}
