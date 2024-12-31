import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("BusinessDayDetail_PK", ["autoKey"], { unique: true })
@Entity("BusinessDayDetail", { schema: "dbo" })
export class BusinessDayDetailEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "AutoKey" })
  autoKey: number;

  @Column("nvarchar", { name: "Vender", nullable: true, length: 200 })
  vender: string | null;

  @Column("nvarchar", { name: "ProgressExplain", nullable: true, length: 500 })
  progressExplain: string | null;

  @Column("bit", { name: "isToday", nullable: true })
  isToday: boolean | null;

  @Column("nvarchar", { name: "Descr", nullable: true, length: 500 })
  descr: string | null;

  @Column("nvarchar", { name: "CreateID", nullable: true, length: 50 })
  createId: string | null;

  @Column("datetime", { name: "CreateDtm", nullable: true })
  createDtm: Date | null;

  @Column("int", { name: "DayKey" })
  dayKey: number;
}
