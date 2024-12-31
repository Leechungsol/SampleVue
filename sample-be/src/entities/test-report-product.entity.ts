import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("TestReportProduct_PK", ["testPKey"], { unique: true })
@Entity("TestReportProduct", { schema: "dbo" })
export class TestReportProductEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "TestPKey" })
  testPKey: number;

  @Column("int", { name: "PartsKey", nullable: true })
  partsKey: number | null;

  @Column("nvarchar", { name: "Grade", nullable: true, length: 100 })
  grade: string | null;

  @Column("int", { name: "ExplainKey" })
  explainKey: number;
}
