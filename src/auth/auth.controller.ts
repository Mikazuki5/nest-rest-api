import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO } from './dto/register.dto';
import { LoginDTO } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  signUp(@Body() registerDTO: RegisterDTO): Promise<{ access_token: string }> {
    return this.authService.registerUser(registerDTO);
  }

  @Post('/login')
  login(@Body() loginDto: LoginDTO): Promise<{ access_token: string }> {
    return this.authService.login(loginDto);
  }
}
