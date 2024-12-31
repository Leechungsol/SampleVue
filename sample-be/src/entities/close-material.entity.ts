import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("CloseMaterial_PK", ["autoKey"], { unique: true })
@Entity("CloseMaterial", { schema: "dbo" })
export class CloseMaterialEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "AutoKey" })
  autoKey: number;

  @Column("int", { name: "MatKey", nullable: true })
  matKey: number | null;

  @Column("int", { name: "Cost", nullable: true })
  cost: number | null;

  @Column("int", { name: "PreStock", nullable: true })
  preStock: number | null;

  @Column("int", { name: "InQty", nullable: true })
  inQty: number | null;

  @Column("int", { name: "OutQty", nullable: true })
  outQty: number | null;

  @Column("int", { name: "StockQty", nullable: true })
  stockQty: number | null;

  @Column("int", { name: "CloseKey" })
  closeKey: number;
}
