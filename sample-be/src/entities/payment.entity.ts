import { Column, Entity, Index } from "typeorm";

@Index("IX01_Payment", ["compKey"], {})
@Index("IX02_Payment", ["payDate"], {})
@Index("Payment_PK", ["payKey"], { unique: true })
@Entity("Payment", { schema: "dbo" })
export class PaymentEntity {
  @Column("int", { primary: true, name: "PayKey" })
  payKey: number;

  @Column("nvarchar", { name: "CompClassify", length: 50 })
  compClassify: string;

  @Column("int", { name: "CompKey" })
  compKey: number;

  @Column("nvarchar", { name: "PayDate", nullable: true, length: 10 })
  payDate: string | null;

  @Column("int", { name: "PayAmount", nullable: true })
  payAmount: number | null;

  @Column("int", { name: "BalanceAmount", nullable: true })
  balanceAmount: number | null;

  @Column("nvarchar", { name: "Descr", nullable: true, length: 500 })
  descr: string | null;

  @Column("nvarchar", { name: "CreateID", nullable: true, length: 50 })
  createId: string | null;

  @Column("smalldatetime", { name: "CreateDtm", nullable: true })
  createDtm: Date | null;

  @Column("nvarchar", {
    name: "ClosedMonth",
    nullable: true,
    length: 7,
    default: () => "''",
  })
  closedMonth: string | null;
}
