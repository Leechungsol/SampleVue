import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("InstructionImage_PK", ["autoKey"], { unique: true })
@Entity("InstructionImage", { schema: "dbo" })
export class InstructionImageEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "AutoKey" })
  autoKey: number;

  @Column("nvarchar", { name: "FileName", nullable: true, length: 500 })
  fileName: string | null;

  @Column("image", { name: "Image", nullable: true })
  image: Buffer | null;

  @Column("nvarchar", { name: "CreateID", nullable: true, length: 50 })
  createId: string | null;

  @Column("datetime", { name: "CreateDtm", nullable: true })
  createDtm: Date | null;

  @Column("int", { name: "ExplainKey" })
  explainKey: number;
}
