import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRutDto } from './dto/login-rut.dto';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { AuthGuard } from './guards/auth.guard';

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

  @Get('user')
  @UseGuards(AuthGuard)
  async user(@ActiveUser() user) {
    return user;
  }
}
