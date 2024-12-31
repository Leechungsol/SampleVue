import { Column, Entity, Index } from "typeorm";

@Index("BusinessInstruction_PK", ["explainKey"], { unique: true })
@Entity("BusinessInstruction", { schema: "dbo" })
export class BusinessInstructionEntity {
  @Column("int", { primary: true, name: "ExplainKey" })
  explainKey: number;

  @Column("int", { name: "OrderCompKey" })
  orderCompKey: number;

  @Column("nvarchar", { name: "OrderDate", nullable: true, length: 10 })
  orderDate: string | null;

  @Column("int", { name: "OrderQuantity", nullable: true })
  orderQuantity: number | null;

  @Column("int", { name: "GoodsCost", nullable: true })
  goodsCost: number | null;

  @Column("int", { name: "ProductKey", nullable: true })
  productKey: number | null;

  @Column("nvarchar", { name: "GoodsName", nullable: true, length: 50 })
  goodsName: string | null;

  @Column("nvarchar", { name: "FinalDueDate", nullable: true, length: 10 })
  finalDueDate: string | null;

  @Column("nvarchar", { name: "Descr", nullable: true, length: 500 })
  descr: string | null;

  @Column("bit", { name: "isDelete", nullable: true })
  isDelete: boolean | null;

  @Column("nvarchar", { name: "CreateID", nullable: true, length: 50 })
  createId: string | null;

  @Column("datetime", { name: "CreateDtm", nullable: true })
  createDtm: Date | null;
}
