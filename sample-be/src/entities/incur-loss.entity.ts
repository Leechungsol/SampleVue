import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("IncurLoss_PK", ["lossKey"], { unique: true })
@Entity("IncurLoss", { schema: "dbo" })
export class IncurLossEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "LossKey" })
  lossKey: number;

  @Column("int", { name: "Vender", nullable: true })
  vender: number | null;

  @Column("int", { name: "LossQuantity", nullable: true })
  lossQuantity: number | null;

  @Column("int", { name: "LossCost", nullable: true })
  lossCost: number | null;

  @Column("int", { name: "LossAmount", nullable: true })
  lossAmount: number | null;

  @Column("nvarchar", { name: "Descr", nullable: true, length: 500 })
  descr: string | null;

  @Column("datetime", { name: "LossDate", nullable: true })
  lossDate: Date | null;

  @Column("bit", { name: "isClose", nullable: true })
  isClose: boolean | null;

  @Column("nvarchar", { name: "CreateID", nullable: true, length: 50 })
  createId: string | null;

  @Column("datetime", { name: "CreateDtm", nullable: true })
  createDtm: Date | null;

  @Column("int", { name: "ExplainKey" })
  explainKey: number;

  @Column("int", { name: "DetailKey" })
  detailKey: number;

  @Column("nvarchar", { name: "CostDescr", nullable: true, length: 200 })
  costDescr: string | null;

  @Column("nvarchar", { name: "PartsName", nullable: true, length: 50 })
  partsName: string | null;
}
