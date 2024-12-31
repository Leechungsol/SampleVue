import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("DistributionPlan_PK", ["distributionKey"], { unique: true })
@Entity("DistributionPlan", { schema: "dbo" })
export class DistributionPlanEntity {
  @Column("int", { name: "ExplainKey" })
  explainKey: number;

  @Column("datetime", { name: "IntervalDtm", nullable: true })
  intervalDtm: Date | null;

  @Column("bit", { name: "isCompleted", nullable: true })
  isCompleted: boolean | null;

  @Column("nvarchar", { name: "CreateID", nullable: true, length: 50 })
  createId: string | null;

  @Column("datetime", { name: "CreateDtm", nullable: true })
  createDtm: Date | null;

  @PrimaryGeneratedColumn({ type: "int", name: "DistributionKey" })
  distributionKey: number;

  @Column("datetime", { name: "CompleteDtm", nullable: true })
  completeDtm: Date | null;
}
