import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { RankWebMappingEntity } from "../../entities/rank-web-mapping.entity";
import { UserDto } from "../user/dto/user.dto";

@Injectable()
export class RankRepository {
  private readonly dataSource: DataSource;
  constructor(
    dataSource: DataSource,
    @InjectRepository(RankWebMappingEntity)
    private readonly rankWebMappingRepository: Repository<RankWebMappingEntity>
  ) {
    this.dataSource = dataSource;
  }

  /**
   * Retrieves the RankWebMappingEntity for the given user's rank.
   *
   * @param user - The user object containing the rank information.
   * @returns A Promise that resolves to the RankWebMappingEntity for the user's rank.
   */
  async getRankWebMapping(user: UserDto): Promise<RankWebMappingEntity[]> {
    return this.rankWebMappingRepository.find({
      where: {
        rank: user.rank,
      },
    });
  }
}
