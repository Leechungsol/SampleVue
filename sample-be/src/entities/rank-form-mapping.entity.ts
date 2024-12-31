import { Column, Entity, Index } from "typeorm";

@Index("RankFormMapping_PK", ["formId", "rank"], { unique: true })
@Entity("RankFormMapping", { schema: "dbo" })
export class RankFormMappingEntity {
  @Column("int", { primary: true, name: "Rank" })
  rank: number;

  @Column("nvarchar", { primary: true, name: "FormID", length: 30 })
  formId: string;

  @Column("nvarchar", { name: "RankType", nullable: true, length: 1 })
  rankType: string | null;
}
