import { Column, Entity, Index } from "typeorm";

@Index("Dept_PK", ["deptKey"], { unique: true })
@Entity("Dept", { schema: "dbo" })
export class DeptEntity {
  @Column("int", { primary: true, name: "DeptKey" })
  deptKey: number;

  @Column("nvarchar", { name: "DeptName", nullable: true, length: 50 })
  deptName: string | null;

  @Column("nvarchar", { name: "Descr", nullable: true, length: 500 })
  descr: string | null;

  @Column("nvarchar", { name: "LoginPassword", nullable: true, length: 20 })
  loginPassword: string | null;
}
