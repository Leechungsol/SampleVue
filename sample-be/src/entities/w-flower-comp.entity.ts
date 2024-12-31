import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("FlowerComp_PK", ["flowerCompKey"], { unique: true })
@Entity("W_FlowerComp", { schema: "dbo" })
export class WFlowerCompEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "FlowerCompKey" })
  flowerCompKey: number;

  @Column("nvarchar", { name: "FlowerCompName", nullable: true, length: 20 })
  flowerCompName: string | null;

  @Column("nvarchar", { name: "FlowerCompOwner", nullable: true, length: 20 })
  flowerCompOwner: string | null;

  @Column("nvarchar", {
    name: "FlowerCompAddress",
    nullable: true,
    length: 100,
  })
  flowerCompAddress: string | null;

  @Column("nvarchar", { name: "FlowerCompTel", nullable: true, length: 20 })
  flowerCompTel: string | null;

  @Column("nvarchar", { name: "FlowerCompEmail", nullable: true, length: 100 })
  flowerCompEmail: string | null;

  @Column("nvarchar", { name: "FlowerCompUrl", nullable: true, length: 100 })
  flowerCompUrl: string | null;

  @Column("bit", { name: "isDeleted", nullable: true })
  isDeleted: boolean | null;

  @Column("date", { name: "LastUpdateDtm", nullable: true })
  lastUpdateDtm: Date | null;

  @Column("date", { name: "CreateDtm", nullable: true })
  createDtm: Date | null;
}
