import { Column, Entity, Index } from "typeorm";

@Index("IX01_WorkProgress", ["ioType"], {})
@Index("IX02_WorkProgress", ["itemKey"], {})
@Index("WorkProgress_PK", ["progressKey"], { unique: true })
@Entity("WorkProgress", { schema: "dbo" })
export class WorkProgressEntity {
  @Column("int", { primary: true, name: "ProgressKey" })
  progressKey: number;

  @Column("int", { name: "ItemKey" })
  itemKey: number;

  @Column("bit", { name: "IOType", nullable: true })
  ioType: boolean | null;

  @Column("nvarchar", { name: "IODate", nullable: true, length: 10 })
  ioDate: string | null;

  @Column("int", { name: "IOQuantity", nullable: true })
  ioQuantity: number | null;

  @Column("nvarchar", { name: "Descr", nullable: true, length: 500 })
  descr: string | null;

  @Column("nvarchar", { name: "Recipient", nullable: true, length: 50 })
  recipient: string | null;

  @Column("nvarchar", { name: "CreateID", nullable: true, length: 50 })
  createId: string | null;

  @Column("smalldatetime", { name: "CreateDtm", nullable: true })
  createDtm: Date | null;
}
