import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class SalaService {
  constructor(private prisma: PrismaService) {}

  async getSalas() {
    return this.prisma.lda_sala.findMany({
      where: {
        flag_activo: true,
        flag_eliminado: false,
      },
      select: {
        iden_sala: true,
        desc_nombre: true,
      },
    });
  }
}
