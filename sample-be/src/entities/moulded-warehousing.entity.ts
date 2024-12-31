import { Column, Entity, Index } from "typeorm";

@Index("MouldedWarehousing_PK", ["warehousingKey"], { unique: true })
@Entity("MouldedWarehousing", { schema: "dbo" })
export class MouldedWarehousingEntity {
  @Column("int", { primary: true, name: "WarehousingKey" })
  warehousingKey: number;

  @Column("int", { name: "ProductKey" })
  productKey: number;

  @Column("int", { name: "PartsKey" })
  partsKey: number;

  @Column("int", { name: "ColorKey" })
  colorKey: number;

  @Column("int", { name: "UseKey" })
  useKey: number;

  @Column("nvarchar", { name: "WarehousingDate", nullable: true, length: 10 })
  warehousingDate: string | null;

  @Column("int", { name: "WarehousingQuantity", nullable: true })
  warehousingQuantity: number | null;

  @Column("nvarchar", { name: "Machine", nullable: true, length: 50 })
  machine: string | null;

  @Column("nvarchar", { name: "Mould", nullable: true, length: 50 })
  mould: string | null;

  @Column("bit", { name: "isDayNight", nullable: true })
  isDayNight: boolean | null;

  @Column("nvarchar", { name: "Descr", nullable: true, length: 500 })
  descr: string | null;

  @Column("nvarchar", { name: "CreateID", nullable: true, length: 50 })
  createId: string | null;

  @Column("smalldatetime", { name: "CreateDtm", nullable: true })
  createDtm: Date | null;

  @Column("int", { name: "MachineKey", nullable: true })
  machineKey: number | null;
}
