import { Column, Entity, Index } from "typeorm";

@Index("PartsColor_PK", ["colorKey"], { unique: true })
@Entity("PartsColor", { schema: "dbo" })
export class PartsColorEntity {
  @Column("int", { primary: true, name: "ColorKey" })
  colorKey: number;

  @Column("nvarchar", { name: "ColorName", nullable: true, length: 50 })
  colorName: string | null;

  @Column("bit", { name: "isDelete", nullable: true })
  isDelete: boolean | null;

  @Column("nvarchar", { name: "Descr", nullable: true, length: 500 })
  descr: string | null;

  @Column("nvarchar", { name: "CreateID", nullable: true, length: 50 })
  createId: string | null;

  @Column("smalldatetime", { name: "CreateDtm", nullable: true })
  createDtm: Date | null;
}
