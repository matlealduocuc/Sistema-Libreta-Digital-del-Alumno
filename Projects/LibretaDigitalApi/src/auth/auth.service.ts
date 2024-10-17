import { Injectable } from '@nestjs/common';
import { LoginRutDto } from './dto/login-rut.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async login(loginRutDto: LoginRutDto) {
    const isCorrect = await this.prisma.usuario
      .findFirst({
        where: {
          persona: {
            run: loginRutDto.run,
          },
          AND: {
            activo: true,
            password: loginRutDto.password,
          },
        },
      })
      .then((usuario) => usuario != null).catch(() => false);
    return isCorrect;
  }
}
