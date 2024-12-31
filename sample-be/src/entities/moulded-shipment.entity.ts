import { Column, Entity, Index } from "typeorm";

@Index("MouldedShipment_PK", ["shipmentKey"], { unique: true })
@Entity("MouldedShipment", { schema: "dbo" })
export class MouldedShipmentEntity {
  @Column("int", { primary: true, name: "ShipmentKey" })
  shipmentKey: number;

  @Column("int", { name: "ProductKey" })
  productKey: number;

  @Column("int", { name: "PartsKey" })
  partsKey: number;

  @Column("int", { name: "ColorKey" })
  colorKey: number;

  @Column("int", { name: "UseKey" })
  useKey: number;

  @Column("nvarchar", { name: "ShipmentDate", nullable: true, length: 10 })
  shipmentDate: string | null;

  @Column("int", { name: "ShipmentQuantity", nullable: true })
  shipmentQuantity: number | null;

  @Column("nvarchar", { name: "Descr", nullable: true, length: 500 })
  descr: string | null;

  @Column("nvarchar", { name: "CreateID", nullable: true, length: 50 })
  createId: string | null;

  @Column("smalldatetime", { name: "CreateDtm", nullable: true })
  createDtm: Date | null;
}
