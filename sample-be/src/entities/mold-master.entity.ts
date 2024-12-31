import { Column, Entity, Index } from "typeorm";

@Index("MoldMaster_PK", ["moldKey"], { unique: true })
@Entity("MoldMaster", { schema: "dbo" })
export class MoldMasterEntity {
  @Column("int", { primary: true, name: "MoldKey" })
  moldKey: number;

  @Column("nvarchar", { name: "MoldProdCode", nullable: true, length: 20 })
  moldProdCode: string | null;

  @Column("nvarchar", { name: "MoldName", nullable: true, length: 60 })
  moldName: string | null;

  @Column("int", { name: "MoldType", nullable: true })
  moldType: number | null;

  @Column("int", { name: "MoldUseCode", nullable: true })
  moldUseCode: number | null;

  @Column("nvarchar", { name: "EquipDescr", nullable: true, length: 30 })
  equipDescr: string | null;

  @Column("datetime", { name: "LastOutDate", nullable: true })
  lastOutDate: Date | null;

  @Column("int", { name: "CompKey", nullable: true })
  compKey: number | null;

  @Column("nvarchar", { name: "Descr", nullable: true, length: 100 })
  descr: string | null;

  @Column("bit", { name: "isDeleted", nullable: true })
  isDeleted: boolean | null;

  @Column("nvarchar", { name: "CreateID", nullable: true, length: 20 })
  createId: string | null;

  @Column("datetime", { name: "CreateDtm", nullable: true })
  createDtm: Date | null;
}
