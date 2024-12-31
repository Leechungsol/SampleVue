import { Column, Entity, Index } from "typeorm";

@Index("ProductTourMaster_PK", ["tourMKey"], { unique: true })
@Entity("ProductTourMaster", { schema: "dbo" })
export class ProductTourMasterEntity {
  @Column("int", { primary: true, name: "TourMKey" })
  tourMKey: number;

  @Column("nvarchar", { name: "TourName", nullable: true, length: 100 })
  tourName: string | null;

  @Column("nvarchar", { name: "TourDate", nullable: true, length: 10 })
  tourDate: string | null;

  @Column("int", { name: "MachineNum", nullable: true })
  machineNum: number | null;

  @Column("int", { name: "ProductKey", nullable: true })
  productKey: number | null;

  @Column("bit", { name: "isDayNight", nullable: true })
  isDayNight: boolean | null;

  @Column("nvarchar", { name: "StartTime", nullable: true, length: 10 })
  startTime: string | null;

  @Column("nvarchar", { name: "EndTime", nullable: true, length: 10 })
  endTime: string | null;

  @Column("int", { name: "Quantity", nullable: true })
  quantity: number | null;

  @Column("nvarchar", { name: "Worker", nullable: true, length: 50 })
  worker: string | null;

  @Column("nvarchar", { name: "LineCheck", nullable: true, length: 50 })
  lineCheck: string | null;

  @Column("nvarchar", { name: "Descr", nullable: true, length: 500 })
  descr: string | null;

  @Column("bit", { name: "isDelete", nullable: true })
  isDelete: boolean | null;

  @Column("nvarchar", { name: "CreateID", nullable: true, length: 50 })
  createId: string | null;

  @Column("datetime", { name: "CreateDtm", nullable: true })
  createDtm: Date | null;

  @Column("nvarchar", { name: "LastUpdateID", nullable: true, length: 50 })
  lastUpdateId: string | null;

  @Column("datetime", { name: "LastUpdateDtm", nullable: true })
  lastUpdateDtm: Date | null;
}
