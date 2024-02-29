import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/createUser.dto';
import { UserResponseType } from './type/userResponse.type';
import { LoginDTO } from './dto/login.dto';

import { ExpressInterface } from './middleware/auth.middleware';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  async currentUser(
    @Request() request: ExpressInterface,
  ): Promise<UserResponseType> {
    if (!request.user) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    return this.userService.buildUserResponse(request.user);
  }

  @Post()
  async createUser(
    @Body() createUserDTO: CreateUserDTO,
  ): Promise<UserResponseType> {
    const user = await this.userService.createUser(createUserDTO);

    return this.userService.buildUserResponse(user);
  }

  @Post('/login')
  async login(@Body() loginDTO: LoginDTO): Promise<UserResponseType> {
    const user = await this.userService.login(loginDTO);

    return this.userService.buildUserResponse(user);
  }
}
