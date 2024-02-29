import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, Request, NextFunction } from 'express';
import { UserEntity } from '../userEntity';
import { verify } from 'jsonwebtoken';
import { UserService } from '../user.service';

export interface ExpressInterface extends Request {
  user?: UserEntity;
}

@Injectable()
export class AuthMinddleware implements NestMiddleware {
  constructor(private userService: UserService) {}

  async use(req: ExpressInterface, res: Response, next: NextFunction) {
    if (!req.headers['authorization']) {
      req.user = null;
      next();
      return;
    }

    const access_token = req.headers['authorization'].split(' ')[1];

    try {
      const decode = verify(access_token, process.env.JWT_SECRET) as {
        email: string;
      };
      const user = await this.userService.findByEmail(decode.email);
      req.user = user;
      next();
    } catch (err) {
      req.user = null;
      next();
    }
  }
}
