import { Column, Entity, Index } from "typeorm";

@Index("CloseMaster_PK", ["closeKey"], { unique: true })
@Entity("CloseMaster", { schema: "dbo" })
export class CloseMasterEntity {
  @Column("int", { primary: true, name: "CloseKey" })
  closeKey: number;

  @Column("nvarchar", { name: "CloseYm", nullable: true, length: 10 })
  closeYm: string | null;

  @Column("bit", { name: "isClose", nullable: true })
  isClose: boolean | null;

  @Column("nvarchar", { name: "CreateID", nullable: true, length: 20 })
  createId: string | null;

  @Column("datetime", { name: "CreateDtm", nullable: true })
  createDtm: Date | null;

  @Column("nvarchar", { name: "LastUpdateID", nullable: true, length: 20 })
  lastUpdateId: string | null;

  @Column("datetime", { name: "LastUpdateDtm", nullable: true })
  lastUpdateDtm: Date | null;
}
