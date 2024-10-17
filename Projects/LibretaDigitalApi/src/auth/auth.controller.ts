import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRutDto } from './dto/login-rut.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body()
    loginRutDto: LoginRutDto,
  ) {
    const isCorrect = await this.authService.login(loginRutDto);
    return isCorrect;
  }
}
