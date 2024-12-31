import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("CarOpHistory_PK", ["autoKey"], { unique: true })
@Index("ix01_CarOpHistory", ["carKey", "historyDate"], {})
@Entity("CarOpHistory", { schema: "dbo" })
export class CarOpHistoryEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "AutoKey" })
  autoKey: number;

  @Column("int", { name: "CarKey" })
  carKey: number;

  @Column("int", { name: "CurrentDistance", nullable: true })
  currentDistance: number | null;

  @Column("datetime", { name: "HistoryDate", nullable: true })
  historyDate: Date | null;

  @Column("nvarchar", { name: "StartPoint", nullable: true, length: 30 })
  startPoint: string | null;

  @Column("nvarchar", { name: "ArrivalPoint", nullable: true, length: 30 })
  arrivalPoint: string | null;

  @Column("nvarchar", { name: "Descr", nullable: true, length: 100 })
  descr: string | null;

  @Column("bit", { name: "isDeleted", nullable: true })
  isDeleted: boolean | null;

  @Column("nvarchar", { name: "CreateID", nullable: true, length: 20 })
  createId: string | null;

  @Column("datetime", { name: "CreateDtm", nullable: true })
  createDtm: Date | null;
}
