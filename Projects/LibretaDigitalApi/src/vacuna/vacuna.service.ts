import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class VacunaService {
  constructor(private prisma: PrismaService) {}

  async getMenorByNivelMenor(
    idNivel: number,
    idMenor: number,
    idEducador: number,
  ) {
    return await this.prisma.menor.findFirst({
      where: {
        id: idMenor,
        flag_activo: true,
        flag_eliminado: false,
        lda_vacuna_menor: {
          some: {
            iden_menor: idMenor,
            lda_vacuna: {
              nmro_agno: {
                equals: new Date().getFullYear(),
              },
            },
          },
        },
        lda_nivel_menor: {
          some: {
            iden_nivel: idNivel,
            flag_activo: true,
            flag_eliminado: false,
            lda_nivel: {
              iden_nivel: idNivel,
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
        per_persona: {
          select: {
            primerNombre: true,
            apellidoP: true,
            apellidoM: true,
          },
        },
        lda_nivel_menor: {
          where: {
            flag_activo: true,
            flag_eliminado: false,
            iden_nivel: idNivel,
            lda_nivel: {
              iden_nivel: idNivel,
              flag_activo: true,
              flag_eliminado: false,
            },
          },
          select: {
            lda_nivel: {
              select: {
                desc_nombre: true,
              },
            },
          },
        },
        lda_vacuna_menor: {
          where: {
            lda_vacuna: {
              nmro_agno: {
                equals: new Date().getFullYear(),
              },
            },
          },
          select: {
            flag_autorizado: true,
            lda_vacuna: {
              select: {
                iden_vacuna: true,
                desc_nombre: true,
                fech_vacunacion: true,
              },
            },
          },
        },
        per_persona_lda_menor_iden_per_apoderadoToper_persona: {
          select: {
            primerNombre: true,
            apellidoP: true,
            apellidoM: true,
            desc_tel: true,
            desc_email: true,
          },
        },
      },
    });
  }
}
