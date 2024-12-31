import { Injectable } from "@nestjs/common";
import { RankWebMappingEntity } from "../../entities/rank-web-mapping.entity";
import { UserDto } from "../user/dto/user.dto";
import { RankRepository } from "./rank.repository";
@Injectable()
export class RankService {
  constructor(private readonly rankRepository: RankRepository) {}

  /**
   * Retrieves the rank web mapping for the given user.
   *
   * @param user - The user for which to retrieve the rank web mapping.
   * @returns The rank web mapping entity for the given user.
   */
  async getRankWebMapping(user: UserDto): Promise<RankWebMappingEntity[]> {
    return this.rankRepository.getRankWebMapping(user);
  }
}
