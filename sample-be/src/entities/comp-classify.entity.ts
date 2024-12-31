import { Column, Entity, Index } from "typeorm";

@Index("CompClassify_PK", ["compClassify"], { unique: true })
@Entity("CompClassify", { schema: "dbo" })
export class CompClassifyEntity {
  @Column("nvarchar", { primary: true, name: "CompClassify", length: 50 })
  compClassify: string;

  @Column("int", { name: "CompKey" })
  compKey: number;

  @Column("nvarchar", { name: "Desc", nullable: true, length: 500 })
  desc: string | null;
}
