import { Column, Entity, Index } from "typeorm";

@Index("CodeInformation_PK", ["category", "detailCode"], { unique: true })
@Entity("CodeInformation", { schema: "dbo" })
export class CodeInformationEntity {
  @Column("nvarchar", { primary: true, name: "Category", length: 30 })
  category: string;

  @Column("int", { primary: true, name: "DetailCode" })
  detailCode: number;

  @Column("nvarchar", { name: "CodeDescr", nullable: true, length: 100 })
  codeDescr: string | null;

  @Column("nvarchar", { name: "Descr", nullable: true, length: 100 })
  descr: string | null;

  @Column("nvarchar", { name: "CreateID", nullable: true, length: 20 })
  createId: string | null;

  @Column("datetime", { name: "CreateDtm", nullable: true })
  createDtm: Date | null;
}
