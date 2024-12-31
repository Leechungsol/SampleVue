import { Column, Entity, Index } from "typeorm";

@Index("DetailOutsourcing_PK", ["outKey"], { unique: true })
@Entity("DetailOutsourcing", { schema: "dbo" })
export class DetailOutsourcingEntity {
  @Column("int", { primary: true, name: "OutKey" })
  outKey: number;

  @Column("int", { name: "ItemKey" })
  itemKey: number;

  @Column("datetime", { name: "StartDate", nullable: true })
  startDate: Date | null;

  @Column("datetime", { name: "EndDate", nullable: true })
  endDate: Date | null;

  @Column("float", { name: "InQty", nullable: true, precision: 53 })
  inQty: number | null;

  @Column("float", { name: "GoodQty", nullable: true, precision: 53 })
  goodQty: number | null;

  @Column("nvarchar", { name: "Descr", nullable: true, length: 500 })
  descr: string | null;

  @Column("float", { name: "ChargeQty", nullable: true, precision: 53 })
  chargeQty: number | null;

  @Column("float", { name: "BoxQty", nullable: true, precision: 53 })
  boxQty: number | null;

  @Column("float", { name: "RemainQty", nullable: true, precision: 53 })
  remainQty: number | null;

  @Column("nvarchar", { name: "OutDate", nullable: true, length: 10 })
  outDate: string | null;
}
