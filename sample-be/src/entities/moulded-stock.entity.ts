import { Column, Entity, Index } from "typeorm";

@Index("MouldedStock_PK", ["colorKey", "useKey", "partsKey", "productKey"], {
  unique: true,
})
@Entity("MouldedStock", { schema: "dbo" })
export class MouldedStockEntity {
  @Column("int", { primary: true, name: "ProductKey" })
  productKey: number;

  @Column("int", { primary: true, name: "PartsKey" })
  partsKey: number;

  @Column("int", { primary: true, name: "ColorKey" })
  colorKey: number;

  @Column("int", { primary: true, name: "UseKey" })
  useKey: number;

  @Column("int", { name: "Stock", nullable: true })
  stock: number | null;

  @Column("nvarchar", { name: "Descr", nullable: true, length: 500 })
  descr: string | null;

  @Column("nvarchar", { name: "CreateID", nullable: true, length: 50 })
  createId: string | null;

  @Column("smalldatetime", { name: "CreateDtm", nullable: true })
  createDtm: Date | null;

  @Column("int", { name: "Cost", nullable: true })
  cost: number | null;
}
