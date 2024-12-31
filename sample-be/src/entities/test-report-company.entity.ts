import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("TestReportCompany_PK", ["testCKey"], { unique: true })
@Entity("TestReportCompany", { schema: "dbo" })
export class TestReportCompanyEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "TestCKey" })
  testCKey: number;

  @Column("int", { name: "ProcessCode", nullable: true })
  processCode: number | null;

  @Column("nvarchar", { name: "CompanyName", nullable: true, length: 100 })
  companyName: string | null;

  @Column("int", { name: "ExplainKey" })
  explainKey: number;
}
