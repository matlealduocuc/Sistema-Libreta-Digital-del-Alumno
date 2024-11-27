import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ReunionApoderadoService {
  constructor(private prisma: PrismaService) {}

  async getReunionesByEducador(idEducador: number) {
    return await this.prisma.lda_reunion.findMany({
      where: {
        flag_activo: true,
        flag_eliminado: false,
        lda_reunion_menor: {
          some: {
            lda_nivel: {
              flag_activo: true,
              flag_eliminado: false,
              lda_nivel_educador: {
                some: {
                  flag_activo: true,
                  flag_eliminado: false,
                  iden_persona: {
                    equals: idEducador,
                  },
                },
              },
            },
          },
        },
      },
      select: {
        iden_reunion: true,
        desc_titulo: true,
        fech_reunion: true,
        lda_sala: {
          select: {
            desc_nombre: true,
          },
        },
      },
    });
  }
}
