import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { PaseoData } from './entities/paseo.entity';

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

  async getTiposPaseo() {
    return await this.prisma.lda_tipo_paseo.findMany({
      select: {
        iden_tipo_paseo: true,
        desc_tipo_paseo: true,
      },
    });
  }

  async crearPaseo(paseo: PaseoData, idEducador: number) {
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
    const dateReal = new Date().setMinutes(
      new Date().getMinutes() - new Date().getTimezoneOffset(),
    );
    const paseoData: any = {
      desc_titulo: paseo.titulo,
      desc_descripcion: paseo.descripcion,
      lda_tipo_paseo: {
        connect: {
          iden_tipo_paseo: paseo.tipoPaseo,
        },
      },
      fech_inicio: new Date(paseo.fechaInicio),
      fech_fin: new Date(paseo.fechaTermino),
      fech_creacion: new Date(dateReal),
      usr_usuario: {
        connect: {
          id: educador.id,
        },
      },
    };

    const paseoCreated = await this.prisma.lda_paseo.create({
      data: paseoData,
    });

    if (paseo.enviarATodosNiveles) {
      const niveles = await this.prisma.lda_nivel.findMany({
        where: {
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
        select: {
          iden_nivel: true,
        },
      });
      for (const nivel of niveles) {
        const menores = await this.prisma.lda_nivel_menor.findMany({
          where: {
            iden_nivel: nivel.iden_nivel,
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
          await this.prisma.lda_paseo_menor.create({
            data: {
              iden_paseo: paseoCreated.iden_paseo,
              iden_menor: menor.iden_menor,
              iden_nivel: nivel.iden_nivel,
              flag_autorizado: false,
            },
          });
        }
      }
    } else {
      for (const nivelId of paseo.nivelesSeleccionados) {
        const nivel = await this.prisma.lda_nivel.findFirst({
          where: {
            iden_nivel: nivelId,
            flag_activo: true,
            flag_eliminado: false,
          },
          select: {
            iden_nivel: true,
          },
        });

        if (nivel) {
          const menores = await this.prisma.lda_nivel_menor.findMany({
            where: {
              iden_nivel: nivel.iden_nivel,
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
            await this.prisma.lda_paseo_menor.create({
              data: {
                iden_paseo: paseoCreated.iden_paseo,
                iden_menor: menor.iden_menor,
                iden_nivel: nivel.iden_nivel,
                flag_autorizado: false,
              },
            });
          }
        }
      }
    }
    return paseoCreated;
  }
}
