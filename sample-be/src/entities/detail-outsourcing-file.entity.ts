import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("DetailOutsourcingFile_PK", ["outFileKey"], { unique: true })
@Entity("DetailOutsourcingFile", { schema: "dbo" })
export class DetailOutsourcingFileEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "OutFileKey" })
  outFileKey: number;

  @Column("int", { name: "OutKey" })
  outKey: number;

  @Column("varbinary", { name: "AttachFile", nullable: true })
  attachFile: Buffer | null;

  @Column("nvarchar", { name: "AttachFileExt", nullable: true, length: 10 })
  attachFileExt: string | null;

  @Column("nvarchar", { name: "CreateID", nullable: true, length: 50 })
  createId: string | null;

  @Column("datetime", { name: "CreateDtm", nullable: true })
  createDtm: Date | null;
}
