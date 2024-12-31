import { Column, Entity, Index } from "typeorm";

@Index("OrderData_PK", ["orderKey"], { unique: true })
@Entity("OrderData", { schema: "dbo" })
export class OrderDataEntity {
  @Column("int", { primary: true, name: "OrderKey" })
  orderKey: number;

  @Column("nvarchar", { name: "OrderNo", nullable: true, length: 50 })
  orderNo: string | null;

  @Column("nvarchar", { name: "OrderDate", nullable: true, length: 10 })
  orderDate: string | null;

  @Column("nvarchar", { name: "DueDate", nullable: true, length: 10 })
  dueDate: string | null;

  @Column("int", { name: "OrderComp", nullable: true })
  orderComp: number | null;

  @Column("int", { name: "Receiver", nullable: true })
  receiver: number | null;

  @Column("nvarchar", { name: "Recipient", nullable: true, length: 50 })
  recipient: string | null;

  @Column("nvarchar", { name: "Reference", nullable: true, length: 500 })
  reference: string | null;

  @Column("nvarchar", { name: "Descr", nullable: true, length: 500 })
  descr: string | null;

  @Column("nvarchar", { name: "CreateID", nullable: true, length: 50 })
  createId: string | null;

  @Column("smalldatetime", { name: "CreateDtm", nullable: true })
  createDtm: Date | null;
}
