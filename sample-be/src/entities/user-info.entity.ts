import { Column, Entity, Index } from "typeorm";

@Index("UserInfo_PK", ["userId"], { unique: true })
@Entity("UserInfo", { schema: "dbo" })
export class UserInfoEntity {
  @Column("nvarchar", { primary: true, name: "UserID", length: 30 })
  userId: string;

  @Column("nvarchar", { name: "Password", nullable: true, length: 30 })
  password: string | null;

  @Column("nvarchar", { name: "UserName", nullable: true, length: 50 })
  userName: string | null;

  @Column("int", { name: "Rank" })
  rank: number;

  @Column("nvarchar", { name: "PhoneNo", nullable: true, length: 50 })
  phoneNo: string | null;

  @Column("bit", { name: "isDelete", nullable: true })
  isDelete: boolean | null;

  @Column("nvarchar", { name: "Descr", nullable: true, length: 500 })
  descr: string | null;

  @Column("nvarchar", { name: "CreateID", nullable: true, length: 50 })
  createId: string | null;

  @Column("datetime", { name: "CreateDtm", nullable: true })
  createDtm: Date | null;

  @Column("int", { name: "DeptKey", nullable: true })
  deptKey: number | null;
}
