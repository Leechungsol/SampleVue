import { Column, Entity, Index } from "typeorm";

@Index("ProductDefect_PK", ["explainKey"], { unique: true })
@Entity("ProductDefect", { schema: "dbo" })
export class ProductDefectEntity {
  @Column("int", { primary: true, name: "ExplainKey" })
  explainKey: number;

  @Column("nvarchar", { name: "DocumentNo", nullable: true, length: 20 })
  documentNo: string | null;

  @Column("nvarchar", { name: "Reason", nullable: true, length: 500 })
  reason: string | null;

  @Column("nvarchar", { name: "Plan", nullable: true, length: 500 })
  plan: string | null;

  @Column("nvarchar", { name: "CreateID", nullable: true, length: 50 })
  createId: string | null;

  @Column("datetime", { name: "CreateDtm", nullable: true })
  createDtm: Date | null;
}
