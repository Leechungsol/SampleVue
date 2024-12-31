import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("DecompressionTestParts_PK", ["decomPKey"], { unique: true })
@Entity("DecompressionTestParts", { schema: "dbo" })
export class DecompressionTestPartsEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "DecomPKey" })
  decomPKey: number;

  @Column("int", { name: "PartsKey", nullable: true })
  partsKey: number | null;

  @Column("nvarchar", { name: "MoldOrderNo", nullable: true, length: 50 })
  moldOrderNo: string | null;

  @Column("int", { name: "DecomKey" })
  decomKey: number;
}
