import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("ProductPlan_PK", ["productPlanKey"], { unique: true })
@Entity("ProductPlan", { schema: "dbo" })
export class ProductPlanEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "ProductPlanKey" })
  productPlanKey: number;

  @Column("int", { name: "PartsKey" })
  partsKey: number;

  @Column("int", { name: "ProductKey" })
  productKey: number;

  @Column("int", { name: "UseKey" })
  useKey: number;

  @Column("int", { name: "ColorKey" })
  colorKey: number;

  @Column("int", { name: "MachineNum", nullable: true })
  machineNum: number | null;

  @Column("int", { name: "ProductQuantity", nullable: true })
  productQuantity: number | null;

  @Column("datetime", { name: "ProductStartDtm", nullable: true })
  productStartDtm: Date | null;

  @Column("datetime", { name: "ProductEndDtm", nullable: true })
  productEndDtm: Date | null;

  @Column("bit", { name: "isCompleted", nullable: true })
  isCompleted: boolean | null;

  @Column("nvarchar", { name: "CreateID", nullable: true, length: 50 })
  createId: string | null;

  @Column("datetime", { name: "CreateDtm", nullable: true })
  createDtm: Date | null;

  @Column("datetime", { name: "CompleteDtm", nullable: true })
  completeDtm: Date | null;
}
