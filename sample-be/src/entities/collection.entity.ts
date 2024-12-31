import { Column, Entity, Index } from "typeorm";

@Index("Collection_PK", ["collectionKey"], { unique: true })
@Index("IX01_Collection", ["compKey"], {})
@Index("IX02_Collection", ["collectDate"], {})
@Entity("Collection", { schema: "dbo" })
export class CollectionEntity {
  @Column("int", { primary: true, name: "CollectionKey" })
  collectionKey: number;

  @Column("nvarchar", { name: "CompClassify", length: 50 })
  compClassify: string;

  @Column("int", { name: "CompKey" })
  compKey: number;

  @Column("nvarchar", { name: "CollectDate", nullable: true, length: 10 })
  collectDate: string | null;

  @Column("int", { name: "CollectAmount", nullable: true })
  collectAmount: number | null;

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
