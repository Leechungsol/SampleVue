import { Column, Entity, Index } from "typeorm";

@Index("FinalDue_PK", ["finalDueKey"], { unique: true })
@Index("IX01_FinalDue", ["itemKey"], {})
@Entity("FinalDue", { schema: "dbo" })
export class FinalDueEntity {
  @Column("int", { primary: true, name: "FinalDueKey" })
  finalDueKey: number;

  @Column("int", { name: "ItemKey" })
  itemKey: number;

  @Column("nvarchar", { name: "FinalDueDate", nullable: true, length: 10 })
  finalDueDate: string | null;

  @Column("int", { name: "FinalDueQuantity", nullable: true })
  finalDueQuantity: number | null;

  @Column("int", { name: "Standard1", nullable: true })
  standard1: number | null;

  @Column("int", { name: "Standard2", nullable: true })
  standard2: number | null;

  @Column("nvarchar", { name: "Recipient", nullable: true, length: 50 })
  recipient: string | null;

  @Column("nvarchar", { name: "Descr", nullable: true, length: 500 })
  descr: string | null;

  @Column("nvarchar", { name: "CreateID", nullable: true, length: 50 })
  createId: string | null;

  @Column("smalldatetime", { name: "CreateDtm", nullable: true })
  createDtm: Date | null;
}
