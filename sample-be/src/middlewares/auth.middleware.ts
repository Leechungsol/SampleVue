import { HttpException } from "@nestjs/common/exceptions/http.exception";
import { NestMiddleware, HttpStatus, Injectable } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { UserService } from "../modules/user/user.service";
import { ConfigService } from "@nestjs/config";

@Injectable()
/**
 * Middleware that verifies the authentication token in the request headers and attaches the authenticated user to the request object.
 *
 * If the token is valid and the user exists, the middleware will set the `req.user` property with the user object.
 * If the token is missing or invalid, the middleware will throw an `HttpException` with a 401 Unauthorized status.
 */
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeaders = req.headers.authorization;
    if (authHeaders && (authHeaders as string).split(" ")[1]) {
      const token = (authHeaders as string).split(" ")[1];
      const decoded: any = jwt.verify(
        token,
        this.configService.get<string>("secret")
      );
      const user = await this.userService.findById(decoded.user.userId);

      if (!user) {
        throw new HttpException("User not found.", HttpStatus.UNAUTHORIZED);
      }

      req.user = user;
      next();
    } else {
      throw new HttpException("Not authorized.", HttpStatus.UNAUTHORIZED);
    }
  }
}
