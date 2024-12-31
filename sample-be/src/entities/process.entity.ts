import { Column, Entity, Index } from "typeorm";

@Index("Process_PK", ["processCode"], { unique: true })
@Entity("Process", { schema: "dbo" })
export class ProcessEntity {
  @Column("int", { primary: true, name: "ProcessCode" })
  processCode: number;

  @Column("nvarchar", { name: "ProcessName", nullable: true, length: 50 })
  processName: string | null;

  @Column("int", { name: "ProcessGroupCode", nullable: true })
  processGroupCode: number | null;

  @Column("nvarchar", { name: "ProcessGroupName", nullable: true, length: 50 })
  processGroupName: string | null;

  @Column("bit", { name: "isDelete", nullable: true })
  isDelete: boolean | null;

  @Column("nvarchar", { name: "Descr", nullable: true, length: 500 })
  descr: string | null;

  @Column("nvarchar", { name: "CreateID", nullable: true, length: 50 })
  createId: string | null;

  @Column("smalldatetime", { name: "CreateDtm", nullable: true })
  createDtm: Date | null;

  @Column("int", { name: "Sort", nullable: true })
  sort: number | null;
}
