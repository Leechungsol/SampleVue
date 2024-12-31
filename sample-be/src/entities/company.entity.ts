import { Column, Entity, Index } from "typeorm";

@Index("Company_PK", ["compKey"], { unique: true })
@Entity("Company", { schema: "dbo" })
export class CompanyEntity {
  @Column("int", { primary: true, name: "CompKey" })
  compKey: number;

  @Column("nvarchar", { name: "CompName", nullable: true, length: 50 })
  compName: string | null;

  @Column("bit", { name: "isBuyType", nullable: true })
  isBuyType: boolean | null;

  @Column("bit", { name: "isSaleType", nullable: true })
  isSaleType: boolean | null;

  @Column("bit", { name: "isDueType", nullable: true })
  isDueType: boolean | null;

  @Column("bit", { name: "isOtherType", nullable: true })
  isOtherType: boolean | null;

  @Column("nvarchar", { name: "CompNo", nullable: true, length: 15 })
  compNo: string | null;

  @Column("nvarchar", { name: "CeoName", nullable: true, length: 50 })
  ceoName: string | null;

  @Column("nvarchar", { name: "CeoPhone", nullable: true, length: 20 })
  ceoPhone: string | null;

  @Column("nvarchar", { name: "CompAddress", nullable: true, length: 500 })
  compAddress: string | null;

  @Column("nvarchar", { name: "BizConditions", nullable: true, length: 50 })
  bizConditions: string | null;

  @Column("nvarchar", { name: "BizType", nullable: true, length: 50 })
  bizType: string | null;

  @Column("nvarchar", { name: "CompPhone", nullable: true, length: 20 })
  compPhone: string | null;

  @Column("nvarchar", { name: "FaxNo", nullable: true, length: 20 })
  faxNo: string | null;

  @Column("nvarchar", { name: "Email", nullable: true, length: 50 })
  email: string | null;

  @Column("nvarchar", { name: "ChargeName", nullable: true, length: 50 })
  chargeName: string | null;

  @Column("nvarchar", { name: "ChargePhone", nullable: true, length: 20 })
  chargePhone: string | null;

  @Column("nvarchar", { name: "BankName", nullable: true, length: 50 })
  bankName: string | null;

  @Column("nvarchar", { name: "AccountNo", nullable: true, length: 20 })
  accountNo: string | null;

  @Column("nvarchar", { name: "Depositor", nullable: true, length: 50 })
  depositor: string | null;

  @Column("nvarchar", { name: "Other1", nullable: true, length: 500 })
  other1: string | null;

  @Column("nvarchar", { name: "Other2", nullable: true, length: 500 })
  other2: string | null;

  @Column("nvarchar", { name: "Other3", nullable: true, length: 500 })
  other3: string | null;

  @Column("nvarchar", { name: "Other4", nullable: true, length: 500 })
  other4: string | null;

  @Column("nvarchar", { name: "Other5", nullable: true, length: 500 })
  other5: string | null;

  @Column("bit", { name: "isDelete", nullable: true })
  isDelete: boolean | null;

  @Column("nvarchar", { name: "Descr", nullable: true, length: 500 })
  descr: string | null;

  @Column("nvarchar", { name: "CreateID", nullable: true, length: 50 })
  createId: string | null;

  @Column("smalldatetime", { name: "CreateDtm", nullable: true })
  createDtm: Date | null;

  @Column("nvarchar", { name: "LoginID", nullable: true, length: 30 })
  loginId: string | null;

  @Column("nvarchar", {
    name: "Password",
    nullable: true,
    length: 30,
  })
  password: string | null;
}
