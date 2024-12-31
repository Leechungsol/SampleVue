import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("BusinessDetailInstruction_PK", ["detailKey"], { unique: true })
@Entity("BusinessDetailInstruction", { schema: "dbo" })
export class BusinessDetailInstructionEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "DetailKey" })
  detailKey: number;

  @Column("int", { name: "ExplainKey" })
  explainKey: number;

  @Column("nvarchar", { name: "PartsName", nullable: true, length: 100 })
  partsName: string | null;

  @Column("int", { name: "DetailCost", nullable: true })
  detailCost: number | null;

  @Column("nvarchar", { name: "Explain", nullable: true, length: 500 })
  explain: string | null;

  @Column("nvarchar", { name: "ReceivingText", nullable: true, length: 500 })
  receivingText: string | null;

  @Column("int", { name: "Vender", nullable: true })
  vender: number | null;

  @Column("bit", { name: "isDelete", nullable: true })
  isDelete: boolean | null;

  @Column("nvarchar", { name: "Descr", nullable: true, length: 500 })
  descr: string | null;

  @Column("nvarchar", { name: "CreateID", nullable: true, length: 50 })
  createId: string | null;

  @Column("datetime", { name: "CreateDtm", nullable: true })
  createDtm: Date | null;
}
