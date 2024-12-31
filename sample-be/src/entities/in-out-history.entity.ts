import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("InOutHistory_PK", ["autoKey"], { unique: true })
@Index("ix01_InOutHistory", ["moldMatType", "moldMatKey"], {})
@Entity("InOutHistory", { schema: "dbo" })
export class InOutHistoryEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "AutoKey" })
  autoKey: number;

  @Column("int", { name: "MoldMatType" })
  moldMatType: number;

  @Column("int", { name: "MoldMatKey" })
  moldMatKey: number;

  @Column("int", { name: "InOutType", nullable: true })
  inOutType: number | null;

  @Column("datetime", { name: "InOutDate", nullable: true })
  inOutDate: Date | null;

  @Column("float", { name: "InOutQty", nullable: true, precision: 53 })
  inOutQty: number | null;

  @Column("int", { name: "CompKey", nullable: true })
  compKey: number | null;

  @Column("bit", { name: "isDeleted", nullable: true })
  isDeleted: boolean | null;

  @Column("nvarchar", { name: "Descr", nullable: true, length: 100 })
  descr: string | null;

  @Column("nvarchar", { name: "CreateID", nullable: true, length: 20 })
  createId: string | null;

  @Column("datetime", { name: "CreateDtm", nullable: true })
  createDtm: Date | null;
}
