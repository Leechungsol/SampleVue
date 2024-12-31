import { Injectable, NotFoundException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserInfoEntity } from "../../entities/user-info.entity";
import { LoginUserDto } from "./dto/login-user.dto";
import { UserDto } from "./dto/user.dto";
import jwt = require("jsonwebtoken");

@Injectable()
export class UserService {
  constructor(
    private readonly config: ConfigService,
    @InjectRepository(UserInfoEntity)
    private readonly userRepository: Repository<UserInfoEntity>
  ) {}

  /**
   * Retrieves a user by their unique username.
   * @param userName - The unique username for the user.
   * @returns A UserDto object containing the user's information, or undefined if the user is not found or has been deleted.
   */
  async findByUsername(userName: string): Promise<UserDto> {
    const result = await this.userRepository.findOne({ where: { userName } });
    return this.buildUserRO(result);
  }

  /**
   * Retrieves a user by their userId and password.
   * @param userId - The unique identifier for the user.
   * @param password - The password for the user.
   * @returns A UserDto object containing the user's information, or undefined if the user is not found or has been deleted.
   */
  async findOne({ userId, password }: LoginUserDto): Promise<UserDto> {
    const user = await this.userRepository.findOne({
      where: { userId, password, isDelete: false },
    });
    if (!user) throw new NotFoundException();
    return this.buildUserRO(user);
  }

  /**
   * Retrieves a user by their unique userId.
   * @param userId - The unique identifier for the user.
   * @returns A UserDto object containing the user's information, or undefined if the user is not found or has been deleted.
   */
  async findById(userId: string): Promise<UserDto> {
    const user = await this.userRepository.findOne({
      where: { userId, isDelete: false },
    });
    return this.buildUserRO(user);
  }

  /**
   * Generates a JSON Web Token (JWT) for the provided user.
   * @param user - The UserDto object containing the user's information.
   * @returns A JWT string that encodes the user's userId, userName, rank, and an expiration time 60 days in the future.
   */
  public generateJWT(user: UserDto) {
    let today = new Date();
    let exp = new Date(today);
    exp.setDate(today.getDate() + 60);
    return jwt.sign(
      {
        user: {
          userId: user.userId,
          userName: user.userName,
          rank: user.rank,
        },
        exp: exp.getTime() / 1000,
      },
      this.config.get<string>("secret")
    );
  }

  /**
   * Builds a UserDto object from a UserInfoEntity.
   * @param user - The UserInfoEntity to build the UserDto from.
   * @returns A UserDto object with the userId, userName, and rank properties populated from the input UserInfoEntity.
   */
  private buildUserRO(user: UserInfoEntity): UserDto {
    const userRO = {
      userId: user.userId,
      userName: user.userName,
      rank: user.rank,
    };

    return userRO;
  }
}
