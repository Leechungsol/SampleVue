import { Column, Entity, Index } from "typeorm";

@Index("Product_PK", ["productKey"], { unique: true })
@Entity("Product", { schema: "dbo" })
export class ProductEntity {
  @Column("int", { primary: true, name: "ProductKey" })
  productKey: number;

  @Column("nvarchar", { name: "ProductName", nullable: true, length: 50 })
  productName: string | null;

  @Column("bit", { name: "isDelete", nullable: true })
  isDelete: boolean | null;

  @Column("nvarchar", { name: "Descr", nullable: true, length: 500 })
  descr: string | null;

  @Column("nvarchar", { name: "CreateID", nullable: true, length: 50 })
  createId: string | null;

  @Column("smalldatetime", { name: "CreateDtm", nullable: true })
  createDtm: Date | null;
}
