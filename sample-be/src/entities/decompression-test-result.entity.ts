import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("DecompressionTestResult_PK", ["decomRKey"], { unique: true })
@Entity("DecompressionTestResult", { schema: "dbo" })
export class DecompressionTestResultEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "DecomRKey" })
  decomRKey: number;

  @Column("int", { name: "OrderNo", nullable: true })
  orderNo: number | null;

  @Column("int", { name: "TestType", nullable: true })
  testType: number | null;

  @Column("nvarchar", { name: "DecomTorr", nullable: true, length: 100 })
  decomTorr: string | null;

  @Column("nvarchar", { name: "DecomTime", nullable: true, length: 100 })
  decomTime: string | null;

  @Column("nvarchar", { name: "DecomLeakage", nullable: true, length: 100 })
  decomLeakage: string | null;

  @Column("int", { name: "DecomKey" })
  decomKey: number;
}
