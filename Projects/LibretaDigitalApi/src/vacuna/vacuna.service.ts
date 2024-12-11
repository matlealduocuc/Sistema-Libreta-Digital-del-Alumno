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

  async getNivelesAvisarVacunaByEducador(idEducador: number) {
    return await this.prisma.lda_nivel.findMany({
      where: {
        lda_nivel_educador: {
          some: {
            iden_persona: idEducador,
            flag_activo: true,
            flag_eliminado: false,
            lda_nivel: {
              flag_activo: true,
              flag_eliminado: false,
            },
            per_persona: {
              id: idEducador,
              flag_activo: true,
              flag_eliminado: false,
            },
          },
        },
        flag_activo: true,
        flag_eliminado: false,
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
        lda_nivel_menor: {
          where: {
            flag_activo: true,
            flag_eliminado: false,
            lda_nivel: {
              flag_activo: true,
              flag_eliminado: false,
            },
            lda_menor: {
              flag_activo: true,
              flag_eliminado: false,
              lda_vacuna_menor: {
                none: {
                  lda_vacuna: {
                    nmro_agno: {
                      not: new Date().getFullYear(),
                    },
                  },
                },
              },
            },
          },
          select: {
            lda_menor: {
              select: {
                lda_vacuna_menor: {
                  select: {
                    flag_autorizado: true,
                    lda_vacuna: {
                      select: {
                        fech_vacunacion: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  async getNivelVacunaByNivel(idNivel: number, idEducador: number) {
    return await this.prisma.lda_nivel.findFirst({
      where: {
        iden_nivel: idNivel,
        lda_nivel_educador: {
          some: {
            iden_persona: idEducador,
            flag_activo: true,
            flag_eliminado: false,
            lda_nivel: {
              flag_activo: true,
              flag_eliminado: false,
            },
            per_persona: {
              id: idEducador,
              flag_activo: true,
              flag_eliminado: false,
            },
          },
        },
        flag_activo: true,
        flag_eliminado: false,
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
        lda_nivel_menor: {
          where: {
            flag_activo: true,
            flag_eliminado: false,
            lda_nivel: {
              flag_activo: true,
              flag_eliminado: false,
            },
            lda_menor: {
              flag_activo: true,
              flag_eliminado: false,
              lda_vacuna_menor: {
                none: {
                  lda_vacuna: {
                    nmro_agno: {
                      not: new Date().getFullYear(),
                    },
                  },
                },
              },
            },
          },
          select: {
            lda_menor: {
              select: {
                lda_vacuna_menor: {
                  select: {
                    flag_autorizado: true,
                    lda_vacuna: {
                      select: {
                        fech_vacunacion: true,
                        iden_vacuna: true,
                        desc_nombre: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  async solicitarVacunaNivel(
    nombVacuna: string,
    fechVacuna: Date,
    idNivel: number,
    idEducador: number,
  ) {
    fechVacuna = new Date(fechVacuna);
    const educador = await this.prisma.usuario.findFirst({
      where: {
        activo: true,
        eliminado: false,
        persona: {
          id: idEducador,
          flag_activo: true,
          flag_eliminado: false,
          lda_nivel_educador: {
            some: {
              flag_activo: true,
              flag_eliminado: false,
              iden_nivel: idNivel,
            },
          },
        },
      },
      select: {
        id: true,
      },
    });
    if (!educador) {
      return false;
    }

    const vacunaData: any = {
      desc_nombre: nombVacuna,
      fech_vacunacion: fechVacuna,
      nmro_agno: fechVacuna.getFullYear(),
    };

    const vacunaCreated = await this.prisma.lda_vacuna.create({
      data: vacunaData,
    });

    const menores = await this.prisma.lda_nivel_menor.findMany({
      where: {
        iden_nivel: idNivel,
        flag_activo: true,
        flag_eliminado: false,
        lda_menor: {
          flag_activo: true,
          flag_eliminado: false,
        },
      },
      select: {
        iden_menor: true,
      },
    });

    for (const menor of menores) {
      await this.prisma.lda_vacuna_menor.create({
        data: {
          iden_vacuna: vacunaCreated.iden_vacuna,
          iden_menor: menor.iden_menor,
          flag_autorizado: false,
        },
      });
    }

    return vacunaCreated;
  }

  async solicitarVacunaMenoresNivel(
    idNivel: number,
    idVacuna: number,
    idEducador: number,
  ) {
    const educador = await this.prisma.usuario.findFirst({
      where: {
        activo: true,
        eliminado: false,
        persona: {
          id: idEducador,
          flag_activo: true,
          flag_eliminado: false,
          lda_nivel_educador: {
            some: {
              flag_activo: true,
              flag_eliminado: false,
              iden_nivel: idNivel,
            },
          },
        },
      },
      select: {
        id: true,
      },
    });
    if (!educador) {
      return false;
    }

    const menores = await this.prisma.lda_nivel_menor.findMany({
      where: {
        iden_nivel: idNivel,
        flag_activo: true,
        flag_eliminado: false,
        lda_menor: {
          flag_activo: true,
          flag_eliminado: false,
        },
        AND: {
          lda_menor: {
            lda_vacuna_menor: {
              none: {
                iden_vacuna: idVacuna,
              },
            },
          },
        },
      },
      select: {
        iden_menor: true,
      },
    });

    for (const menor of menores) {
      await this.prisma.lda_vacuna_menor.create({
        data: {
          iden_vacuna: idVacuna,
          iden_menor: menor.iden_menor,
          flag_autorizado: false,
        },
      });
    }

    return true;
  }
}
