import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("DetailOutsourcingHistory_PK", ["outHistoryKey"], { unique: true })
@Entity("DetailOutsourcingHistory", { schema: "dbo" })
export class DetailOutsourcingHistoryEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "OutHistoryKey" })
  outHistoryKey: number;

  @Column("int", { name: "OutKey" })
  outKey: number;

  @Column("nvarchar", { name: "EditType", nullable: true, length: 50 })
  editType: string | null;

  @Column("nvarchar", { name: "Descr1", nullable: true, length: 500 })
  descr1: string | null;

  @Column("nvarchar", { name: "Descr2", nullable: true, length: 500 })
  descr2: string | null;

  @Column("nvarchar", { name: "Descr3", nullable: true, length: 500 })
  descr3: string | null;

  @Column("nvarchar", { name: "UpdateID", nullable: true, length: 50 })
  updateId: string | null;

  @Column("datetime", { name: "UpdateDtm", nullable: true })
  updateDtm: Date | null;
}
