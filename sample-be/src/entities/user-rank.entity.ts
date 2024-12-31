import { Column, Entity, Index } from "typeorm";

@Index("UserRank_PK", ["rank"], { unique: true })
@Entity("UserRank", { schema: "dbo" })
export class UserRankEntity {
  @Column("int", { primary: true, name: "Rank" })
  rank: number;

  @Column("nvarchar", { name: "RankName", nullable: true, length: 50 })
  rankName: string | null;

  @Column("nvarchar", { name: "Descr", nullable: true, length: 500 })
  descr: string | null;
}
