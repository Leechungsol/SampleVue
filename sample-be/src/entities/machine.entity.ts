import { Column, Entity, Index } from "typeorm";

@Index("Machine_PK", ["machineKey"], { unique: true })
@Entity("Machine", { schema: "dbo" })
export class MachineEntity {
  @Column("int", { primary: true, name: "MachineKey" })
  machineKey: number;

  @Column("nvarchar", { name: "MachineName", nullable: true, length: 50 })
  machineName: string | null;

  @Column("bit", { name: "isDelete", nullable: true })
  isDelete: boolean | null;

  @Column("nvarchar", { name: "Descr", nullable: true, length: 500 })
  descr: string | null;

  @Column("nvarchar", { name: "CreateID", nullable: true, length: 50 })
  createId: string | null;

  @Column("datetime", { name: "CreateDtm", nullable: true })
  createDtm: Date | null;
}
