import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("OrderProductPlan_PK", ["orderKey"], { unique: true })
@Entity("OrderProductPlan", { schema: "dbo" })
export class OrderProductPlanEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "OrderKey" })
  orderKey: number;

  @Column("int", { name: "MouldedVender", nullable: true })
  mouldedVender: number | null;

  @Column("datetime", { name: "MouldedCompleteDtm", nullable: true })
  mouldedCompleteDtm: Date | null;

  @Column("int", { name: "CoatingVender", nullable: true })
  coatingVender: number | null;

  @Column("datetime", { name: "CoatingCompleteDtm", nullable: true })
  coatingCompleteDtm: Date | null;

  @Column("int", { name: "PrintVender", nullable: true })
  printVender: number | null;

  @Column("datetime", { name: "PrintCompleteDtm", nullable: true })
  printCompleteDtm: Date | null;

  @Column("int", { name: "AssemblyVender", nullable: true })
  assemblyVender: number | null;

  @Column("datetime", { name: "AssemblyCompleteDtm", nullable: true })
  assemblyCompleteDtm: Date | null;

  @Column("datetime", { name: "DueDtm", nullable: true })
  dueDtm: Date | null;

  @Column("nvarchar", { name: "Descr", nullable: true, length: 500 })
  descr: string | null;

  @Column("int", { name: "ExplainKey" })
  explainKey: number;

  @Column("int", { name: "PartsKey" })
  partsKey: number;
}
