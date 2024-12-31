import { Column, Entity, Index } from "typeorm";

@Index("CarMaster_PK", ["carKey"], { unique: true })
@Entity("CarMaster", { schema: "dbo" })
export class CarMasterEntity {
  @Column("int", { primary: true, name: "CarKey" })
  carKey: number;

  @Column("nvarchar", { name: "CarNo", nullable: true, length: 20 })
  carNo: string | null;

  @Column("nvarchar", { name: "CarName", nullable: true, length: 30 })
  carName: string | null;

  @Column("int", { name: "TotalDistance", nullable: true })
  totalDistance: number | null;

  @Column("int", { name: "ChangeDistance", nullable: true })
  changeDistance: number | null;

  @Column("bit", { name: "isChangeAlarm", nullable: true })
  isChangeAlarm: boolean | null;

  @Column("nvarchar", { name: "Descr", nullable: true, length: 100 })
  descr: string | null;

  @Column("nvarchar", { name: "Info1", nullable: true, length: 30 })
  info1: string | null;

  @Column("nvarchar", { name: "Info2", nullable: true, length: 60 })
  info2: string | null;

  @Column("bit", { name: "isDeleted", nullable: true })
  isDeleted: boolean | null;

  @Column("nvarchar", { name: "CreateID", nullable: true, length: 20 })
  createId: string | null;

  @Column("datetime", { name: "CreateDtm", nullable: true })
  createDtm: Date | null;
}
