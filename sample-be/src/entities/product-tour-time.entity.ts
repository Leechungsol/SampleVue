import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("ProductTourTime_PK", ["tourTKey"], { unique: true })
@Entity("ProductTourTime", { schema: "dbo" })
export class ProductTourTimeEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "TourTKey" })
  tourTKey: number;

  @Column("int", { name: "WorkTime", nullable: true })
  workTime: number | null;

  @Column("nvarchar", { name: "Descr", nullable: true, length: 50 })
  descr: string | null;

  @Column("int", { name: "TourMKey" })
  tourMKey: number;
}
