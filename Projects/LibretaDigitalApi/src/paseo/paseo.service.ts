import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PaseoService {
  constructor(private prisma: PrismaService) {}

  async getPaseosByEducador(idEducador: number) {
    return await this.prisma.lda_paseo.findMany({
      where: {
        flag_activo: true,
        flag_eliminado: false,
        lda_paseo_menor: {
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
        iden_paseo: true,
        desc_titulo: true,
        fech_inicio: true,
        fech_fin: true,
        lda_tipo_paseo: {
          select: {
            desc_tipo_paseo: true,
          },
        },
      },
    });
  }

  async getNivelesByPaseo(idPaseo: number, idEducador: number) {
    return await this.prisma.lda_nivel.findMany({
      where: {
        flag_activo: true,
        flag_eliminado: false,
        lda_paseo_menor: {
          some: {
            lda_paseo: {
              flag_activo: true,
              flag_eliminado: false,
              iden_paseo: { equals: idPaseo },
            },
          },
        },
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
      select: {
        iden_nivel: true,
        desc_nombre: true,
        _count: {
          select: {
            lda_nivel_menor: {
              where: {
                lda_menor: {
                  flag_activo: true,
                  flag_eliminado: false,
                },
              },
            },
          },
        },
      },
    });
  }

  async getMenoresByPaseoNivel(
    idPaseo: number,
    idNivel: number,
    idEducador: number,
  ) {
    return await this.prisma.lda_paseo_menor.findMany({
      where: {
        lda_menor: {
          flag_activo: true,
          flag_eliminado: false,
          per_persona: {
            flag_activo: true,
            flag_eliminado: false,
          },
          lda_nivel_menor: {
            some: {
              lda_nivel: {
                iden_nivel: idNivel,
                flag_activo: true,
                flag_eliminado: false,
              },
            },
          },
        },
        lda_nivel: {
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
        iden_nivel: {
          equals: idNivel,
        },
        iden_paseo: {
          equals: idPaseo,
        },
      },
      select: {
        iden_menor: true,
        flag_autorizado: true,
        lda_menor: {
          select: {
            id: true,
            per_persona: {
              select: {
                primerNombre: true,
                apellidoP: true,
                apellidoM: true,
              },
            },
            per_persona_lda_menor_iden_per_apoderadoToper_persona: {
              select: {
                primerNombre: true,
                apellidoP: true,
                apellidoM: true,
              },
            },
          },
        },
      },
    });
  }

  async getMenorByPaseoNivelMenor(
    idPaseo: number,
    idNivel: number,
    idMenor: number,
    idEducador: number,
  ) {
    return await this.prisma.menor.findUnique({
      where: {
        flag_activo: true,
        flag_eliminado: false,
        id: idMenor,
        per_persona: {
          flag_activo: true,
          flag_eliminado: false,
        },
        lda_nivel_menor: {
          some: {
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
                  per_persona: {
                    flag_activo: true,
                    flag_eliminado: false,
                    id: {
                      equals: idEducador,
                    },
                  },
                },
              },
            },
          },
        },
        lda_paseo_menor: {
          some: {
            lda_paseo: {
              flag_activo: true,
              flag_eliminado: false,
              iden_paseo: {
                equals: idPaseo,
              },
            },
            iden_paseo: {
              equals: idPaseo,
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
          select: {
            lda_nivel: {
              select: {
                desc_nombre: true,
              },
            },
          },
          where: {
            lda_nivel: {
              iden_nivel: idNivel,
              flag_activo: true,
              flag_eliminado: false,
            },
            flag_activo: true,
            flag_eliminado: false,
          },
        },
        lda_paseo_menor: {
          where: {
            iden_paseo: idPaseo,
            iden_menor: idMenor,
            iden_nivel: idNivel,
          },
          select: {
            flag_autorizado: true,
            lda_paseo: {
              select: {
                desc_titulo: true,
                desc_descripcion: true,
                fech_inicio: true,
                fech_fin: true,
                lda_tipo_paseo: {
                  select: {
                    desc_tipo_paseo: true,
                  },
                },
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
