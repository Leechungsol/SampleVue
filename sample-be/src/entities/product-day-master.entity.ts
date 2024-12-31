import { Column, Entity, Index } from "typeorm";

@Index("ProductDayMaster_PK", ["dayKey"], { unique: true })
@Entity("ProductDayMaster", { schema: "dbo" })
export class ProductDayMasterEntity {
  @Column("int", { primary: true, name: "DayKey" })
  dayKey: number;

  @Column("datetime", { name: "DayDate" })
  dayDate: Date;

  @Column("nvarchar", { name: "Descr", nullable: true, length: 500 })
  descr: string | null;

  @Column("nvarchar", { name: "CreateID", nullable: true, length: 50 })
  createId: string | null;

  @Column("datetime", { name: "CreateDtm", nullable: true })
  createDtm: Date | null;
}
