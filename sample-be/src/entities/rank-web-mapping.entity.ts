import { Column, Entity, Index } from "typeorm";

@Index("RankWebMapping_PK", ["formId", "rank"], { unique: true })
@Entity("RankWebMapping", { schema: "dbo" })
export class RankWebMappingEntity {
  @Column("nvarchar", { primary: true, name: "FormID", length: 30 })
  formId: string;

  @Column("int", { primary: true, name: "Rank" })
  rank: number;

  @Column("nvarchar", { name: "RankType", nullable: true, length: 1 })
  rankType: string | null;
}
