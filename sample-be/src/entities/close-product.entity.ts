import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("CloseProduct_PK", ["autoKey"], { unique: true })
@Entity("CloseProduct", { schema: "dbo" })
export class CloseProductEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "AutoKey" })
  autoKey: number;

  @Column("int", { name: "ProductKey", nullable: true })
  productKey: number | null;

  @Column("int", { name: "PartsKey", nullable: true })
  partsKey: number | null;

  @Column("int", { name: "ColorKey", nullable: true })
  colorKey: number | null;

  @Column("int", { name: "UseKey", nullable: true })
  useKey: number | null;

  @Column("int", { name: "Cost", nullable: true })
  cost: number | null;

  @Column("int", { name: "Qty", nullable: true })
  qty: number | null;

  @Column("int", { name: "CloseKey" })
  closeKey: number;
}
