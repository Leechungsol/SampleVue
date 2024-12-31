import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("ProductDayDetail_PK", ["autoKey"], { unique: true })
@Entity("ProductDayDetail", { schema: "dbo" })
export class ProductDayDetailEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "AutoKey" })
  autoKey: number;

  @Column("int", { name: "MachineKey", nullable: true })
  machineKey: number | null;

  @Column("int", { name: "ProductKey", nullable: true })
  productKey: number | null;

  @Column("int", { name: "PartsKey", nullable: true })
  partsKey: number | null;

  @Column("int", { name: "UseKey", nullable: true })
  useKey: number | null;

  @Column("int", { name: "ColorKey", nullable: true })
  colorKey: number | null;

  @Column("int", { name: "ProductWeight", nullable: true })
  productWeight: number | null;

  @Column("int", { name: "SPRUEWeight", nullable: true })
  sprueWeight: number | null;

  @Column("int", { name: "Cavity", nullable: true })
  cavity: number | null;

  @Column("int", { name: "CycleTime", nullable: true })
  cycleTime: number | null;

  @Column("int", { name: "DayQuantity", nullable: true })
  dayQuantity: number | null;

  @Column("int", { name: "BoxQuantity", nullable: true })
  boxQuantity: number | null;

  @Column("int", { name: "BoxDay", nullable: true })
  boxDay: number | null;

  @Column("int", { name: "BoxNight", nullable: true })
  boxNight: number | null;

  @Column("int", { name: "EADay", nullable: true })
  eaDay: number | null;

  @Column("int", { name: "EANight", nullable: true })
  eaNight: number | null;

  @Column("nvarchar", { name: "Descr", nullable: true, length: 500 })
  descr: string | null;

  @Column("nvarchar", { name: "CreateID", nullable: true, length: 50 })
  createId: string | null;

  @Column("datetime", { name: "CreateDtm", nullable: true })
  createDtm: Date | null;

  @Column("int", { name: "DayKey" })
  dayKey: number;
}
