import { Column, Entity, Index } from "typeorm";

@Index("PartsType_PK", ["partsKey"], { unique: true })
@Entity("PartsType", { schema: "dbo" })
export class PartsTypeEntity {
  @Column("int", { primary: true, name: "PartsKey" })
  partsKey: number;

  @Column("nvarchar", { name: "PartsName", nullable: true, length: 50 })
  partsName: string | null;

  @Column("bit", { name: "isDelete", nullable: true })
  isDelete: boolean | null;

  @Column("nvarchar", { name: "Descr", nullable: true, length: 500 })
  descr: string | null;

  @Column("nvarchar", { name: "CreateID", nullable: true, length: 50 })
  createId: string | null;

  @Column("smalldatetime", { name: "CreateDtm", nullable: true })
  createDtm: Date | null;
}
