import { Column, Entity, Index } from "typeorm";

@Index("PartsUse_PK", ["useKey"], { unique: true })
@Entity("PartsUse", { schema: "dbo" })
export class PartsUseEntity {
  @Column("int", { primary: true, name: "UseKey" })
  useKey: number;

  @Column("nvarchar", { name: "UseName", nullable: true, length: 50 })
  useName: string | null;

  @Column("bit", { name: "isDelete", nullable: true })
  isDelete: boolean | null;

  @Column("nvarchar", { name: "Descr", nullable: true, length: 500 })
  descr: string | null;

  @Column("nvarchar", { name: "CreateID", nullable: true, length: 50 })
  createId: string | null;

  @Column("smalldatetime", { name: "CreateDtm", nullable: true })
  createDtm: Date | null;
}
