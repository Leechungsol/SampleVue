import { Column, Entity, Index } from "typeorm";

@Index("MaterialMaster_PK", ["matKey"], { unique: true })
@Entity("MaterialMaster", { schema: "dbo" })
export class MaterialMasterEntity {
  @Column("int", { primary: true, name: "MatKey" })
  matKey: number;

  @Column("nvarchar", { name: "MatCode", nullable: true, length: 20 })
  matCode: string | null;

  @Column("nvarchar", { name: "MatName", nullable: true, length: 60 })
  matName: string | null;

  @Column("int", { name: "MatType", nullable: true })
  matType: number | null;

  @Column("nvarchar", { name: "MatUnit", nullable: true, length: 30 })
  matUnit: string | null;

  @Column("nvarchar", { name: "MatColor", nullable: true, length: 10 })
  matColor: string | null;

  @Column("float", { name: "MatQty", nullable: true, precision: 53 })
  matQty: number | null;

  @Column("nvarchar", { name: "Descr", nullable: true, length: 100 })
  descr: string | null;

  @Column("bit", { name: "isDeleted", nullable: true })
  isDeleted: boolean | null;

  @Column("nvarchar", { name: "CreateID", nullable: true, length: 20 })
  createId: string | null;

  @Column("datetime", { name: "CreateDtm", nullable: true })
  createDtm: Date | null;
}
