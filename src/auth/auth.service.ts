import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schemas';
import { JwtService } from '@nestjs/jwt';
import { RegisterDTO } from './dto/register.dto';

import * as bcrypt from 'bcryptjs';
import { LoginDTO } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async registerUser(
    registerDTO: RegisterDTO,
  ): Promise<{ access_token: string }> {
    const { username, email, password } = registerDTO;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      username,
      email,
      password: hashedPassword,
    });

    const access_token = this.jwtService.sign({ id: user._id });

    return { access_token };
  }

  async login(loginDTO: LoginDTO): Promise<{ access_token: string }> {
    const { email, password } = loginDTO;

    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const access_token = this.jwtService.sign({ id: user._id });

    return { access_token };
  }
}
