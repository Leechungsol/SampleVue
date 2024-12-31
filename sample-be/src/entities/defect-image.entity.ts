import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("DefectImage_PK", ["imageKey"], { unique: true })
@Entity("DefectImage", { schema: "dbo" })
export class DefectImageEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "ImageKey" })
  imageKey: number;

  @Column("image", { name: "Image", nullable: true })
  image: Buffer | null;

  @Column("nvarchar", { name: "CreateID", nullable: true, length: 50 })
  createId: string | null;

  @Column("datetime", { name: "CreateDtm", nullable: true })
  createDtm: Date | null;

  @Column("int", { name: "ExplainKey" })
  explainKey: number;
}
