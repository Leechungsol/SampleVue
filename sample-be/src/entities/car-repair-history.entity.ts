import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("CarRepairHistory_PK", ["autoKey"], { unique: true })
@Index("ix01_CarRepairHistory", ["carKey", "historyDate"], {})
@Entity("CarRepairHistory", { schema: "dbo" })
export class CarRepairHistoryEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "AutoKey" })
  autoKey: number;

  @Column("int", { name: "CarKey" })
  carKey: number;

  @Column("int", { name: "CurrentDistance", nullable: true })
  currentDistance: number | null;

  @Column("datetime", { name: "HistoryDate", nullable: true })
  historyDate: Date | null;

  @Column("nvarchar", { name: "RepairCompany", nullable: true, length: 30 })
  repairCompany: string | null;

  @Column("bit", { name: "isReplaceOil", nullable: true })
  isReplaceOil: boolean | null;

  @Column("nvarchar", { name: "RepairDescr", nullable: true, length: 100 })
  repairDescr: string | null;

  @Column("int", { name: "RepairAmount", nullable: true })
  repairAmount: number | null;

  @Column("nvarchar", { name: "Descr", nullable: true, length: 100 })
  descr: string | null;

  @Column("bit", { name: "isDeleted", nullable: true })
  isDeleted: boolean | null;

  @Column("nvarchar", { name: "CreateID", nullable: true, length: 20 })
  createId: string | null;

  @Column("datetime", { name: "CreateDtm", nullable: true })
  createDtm: Date | null;
}
