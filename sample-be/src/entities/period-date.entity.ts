import { Column, Entity, Index } from "typeorm";

@Index("IX01_PeriodDate", ["baseMonth"], {})
@Index("PeriodDate_PK", ["baseDate"], { unique: true })
@Entity("PeriodDate", { schema: "dbo" })
export class PeriodDateEntity {
  @Column("nvarchar", { primary: true, name: "BaseDate", length: 255 })
  baseDate: string;

  @Column("nvarchar", { name: "BaseDateDescr", nullable: true, length: 255 })
  baseDateDescr: string | null;

  @Column("nvarchar", { name: "BaseMonth", nullable: true, length: 255 })
  baseMonth: string | null;

  @Column("nvarchar", { name: "BaseMonthDescr", nullable: true, length: 255 })
  baseMonthDescr: string | null;

  @Column("nvarchar", { name: "BaseYear", nullable: true, length: 255 })
  baseYear: string | null;

  @Column("nvarchar", { name: "BaseYearDescr", nullable: true, length: 255 })
  baseYearDescr: string | null;
}
