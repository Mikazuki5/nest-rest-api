import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/createUser.dto';
import { InjectModel } from '@nestjs/mongoose';
import { UserEntity } from './userEntity';
import { Model } from 'mongoose';
import { UserResponseType } from './type/userResponse.type';
import { LoginDTO } from './dto/login.dto';

import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserEntity.name) private userModel: Model<UserEntity>,
  ) {}
  async createUser(createUserDTO: CreateUserDTO): Promise<UserEntity> {
    const user = await this.userModel.findOne({ email: createUserDTO.email });

    if (user) {
      throw new HttpException(
        'Email is already taken',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const createdUser = new this.userModel(createUserDTO);

    return createdUser.save();
  }

  async login(loginDTO: LoginDTO): Promise<UserEntity> {
    const user = await this.userModel
      .findOne({ email: loginDTO.email })
      .select('+password');

    if (!user) {
      throw new HttpException(
        'User not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const isPasswordCorrect = await compare(loginDTO.password, user.password);

    if (!isPasswordCorrect) {
      throw new HttpException('Incorrect password', HttpStatus.BAD_REQUEST);
    }

    return user;
  }

  buildUserResponse(UserEntity: UserEntity): UserResponseType {
    return {
      username: UserEntity.username,
      email: UserEntity.email,
      access_token: this.generateWebToken(UserEntity),
    };
  }

  generateWebToken(userEntity: UserEntity) {
    return sign({ email: userEntity.email }, process.env.JWT_SECRET);
  }

  async findByEmail(email: string): Promise<UserEntity> {
    return this.userModel.findOne({ email });
  }
}
