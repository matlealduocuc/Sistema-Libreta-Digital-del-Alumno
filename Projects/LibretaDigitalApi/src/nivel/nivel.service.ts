import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class NivelService {
  constructor(private prisma: PrismaService) {}

  async getNivelesWhereSomeVacuna(idPersona: number) {
    return this.prisma.lda_nivel.findMany({
      where: {
        flag_activo: true,
        flag_eliminado: false,
        lda_nivel_educador: {
          some: {
            iden_persona: {
              equals: idPersona,
            },
          },
        },
        lda_nivel_menor: {
          some: {
            lda_menor: {
              flag_activo: true,
              flag_eliminado: false,
              lda_vacuna_menor: {
                some: {
                  lda_vacuna: {
                    nmro_agno: {
                      equals: new Date().getFullYear(),
                    },
                  },
                },
              },
            },
          },
        },
      },
      select: {
        iden_nivel: true,
        desc_nombre: true,
        _count: {
          select: {
            lda_nivel_menor: {
              where: {
                flag_activo: true,
                flag_eliminado: false,
              },
            },
          },
        },
      },
    });
  }
}
