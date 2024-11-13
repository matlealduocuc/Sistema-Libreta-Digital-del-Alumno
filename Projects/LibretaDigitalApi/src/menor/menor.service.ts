import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class MenorService {
  constructor(private prisma: PrismaService) {}

  async getMenores() {
    const menores = await this.prisma.menor.findMany();
    return menores;
  }

  getMenor(id: number) {
    return this.prisma.menor.findUnique({
      where: { id: id },
    });
  }

  async getSelectMenoresApoderadoByIdNivel(idNivel: number) {
    return await this.prisma.menor.findMany({
      where: {
        lda_nivel_menor: {
          every: {
            iden_nivel: idNivel,
            flag_activo: true,
            flag_eliminado: false,
          },
        },
        flag_activo: true,
        flag_eliminado: false,
      },
      select: {
        id: true,
        per_persona: {
          select: {
            primerNombre: true,
            segundoNombre: true,
            apellidoP: true,
            apellidoM: true,
          },
        },
        per_persona_lda_menor_iden_per_apoderadoToper_persona: {
          select: {
            primerNombre: true,
            segundoNombre: true,
            apellidoP: true,
            apellidoM: true,
            flag_activo: true,
            flag_eliminado: true,
          },
        },
        per_persona_lda_menor_iden_per_apoderado_supToper_persona: {
          select: {
            primerNombre: true,
            segundoNombre: true,
            apellidoP: true,
            apellidoM: true,
            flag_activo: true,
            flag_eliminado: true,
          },
        },
      },
    });
  }
}
