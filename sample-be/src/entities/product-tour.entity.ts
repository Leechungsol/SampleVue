import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("ProductTour_PK", ["tourPKey"], { unique: true })
@Entity("ProductTour", { schema: "dbo" })
export class ProductTourEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "TourPKey" })
  tourPKey: number;

  @Column("int", { name: "WorkType", nullable: true })
  workType: number | null;

  @Column("int", { name: "WorkTime", nullable: true })
  workTime: number | null;

  @Column("nvarchar", { name: "WorkResult", nullable: true, length: 20 })
  workResult: string | null;

  @Column("int", { name: "TourMKey" })
  tourMKey: number;
}
