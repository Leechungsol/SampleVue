import { Column, Entity, Index } from "typeorm";

@Index("DecompressionTestMaster_PK", ["decomKey"], { unique: true })
@Entity("DecompressionTestMaster", { schema: "dbo" })
export class DecompressionTestMasterEntity {
  @Column("int", { primary: true, name: "DecomKey" })
  decomKey: number;

  @Column("nvarchar", { name: "DecomName", nullable: true, length: 100 })
  decomName: string | null;

  @Column("nvarchar", { name: "DecomDate", nullable: true, length: 10 })
  decomDate: string | null;

  @Column("nvarchar", { name: "DeptName", nullable: true, length: 100 })
  deptName: string | null;

  @Column("nvarchar", { name: "Writer", nullable: true, length: 100 })
  writer: string | null;

  @Column("int", { name: "ProductKey", nullable: true })
  productKey: number | null;

  @Column("nvarchar", { name: "Descr", nullable: true, length: 500 })
  descr: string | null;

  @Column("bit", { name: "isDelete", nullable: true })
  isDelete: boolean | null;

  @Column("nvarchar", { name: "CreateID", nullable: true, length: 50 })
  createId: string | null;

  @Column("datetime", { name: "CreateDtm", nullable: true })
  createDtm: Date | null;

  @Column("nvarchar", { name: "LastUpdateID", nullable: true, length: 50 })
  lastUpdateId: string | null;

  @Column("datetime", { name: "LastUpdateDtm", nullable: true })
  lastUpdateDtm: Date | null;
}
