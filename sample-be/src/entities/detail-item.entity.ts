import { Column, Entity, Index } from "typeorm";

@Index("DetailItem_PK", ["itemKey"], { unique: true })
@Index("IX01_DetailItem", ["receiving"], {})
@Index("IX02_DetailItem", ["detailKey"], {})
@Entity("DetailItem", { schema: "dbo" })
export class DetailItemEntity {
  @Column("int", { primary: true, name: "ItemKey" })
  itemKey: number;

  @Column("int", { name: "DetailKey" })
  detailKey: number;

  @Column("int", { name: "PartsKey" })
  partsKey: number;

  @Column("int", { name: "Receiving" })
  receiving: number;

  @Column("int", { name: "ReceivingQuantity", nullable: true })
  receivingQuantity: number | null;

  @Column("nvarchar", { name: "ProcessExplain", nullable: true, length: 500 })
  processExplain: string | null;

  @Column("nvarchar", { name: "Descr", nullable: true, length: 500 })
  descr: string | null;

  @Column("nvarchar", { name: "CreateID", nullable: true, length: 50 })
  createId: string | null;

  @Column("smalldatetime", { name: "CreateDtm", nullable: true })
  createDtm: Date | null;

  @Column("bit", { name: "isDelete", nullable: true, default: () => "(0)" })
  isDelete: boolean | null;

  @Column("int", { name: "UseKey", nullable: true })
  useKey: number | null;

  @Column("int", { name: "ColorKey", nullable: true })
  colorKey: number | null;
}
