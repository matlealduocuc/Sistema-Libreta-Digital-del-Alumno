import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ItinerarioData } from './entities/itinerario.entity';

@Injectable()
export class ItinerarioService {
  constructor(private prisma: PrismaService) {}

  async getItinerariosByEducador(idEducador: number) {
    return await this.prisma.lda_itinerario.findMany({
      where: {
        flag_activo: true,
        flag_eliminado: false,
        lda_itinerario_menor: {
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
        iden_itinerario: true,
        desc_titulo: true,
        fech_itinerario: true,
      },
    });
  }

  async getNivelesByItinerario(idItinerario: number, idEducador: number) {
    return await this.prisma.lda_nivel.findMany({
      where: {
        flag_activo: true,
        flag_eliminado: false,
        lda_itinerario_menor: {
          some: {
            lda_itinerario: {
              flag_activo: true,
              flag_eliminado: false,
              iden_itinerario: idItinerario,
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
                flag_activo: true,
                flag_eliminado: false,
              },
            },
          },
        },
      },
    });
  }

  async getMenoresByItinerarioNivel(
    idItinerario: number,
    idNivel: number,
    idEducador: number,
  ) {
    return await this.prisma.menor.findMany({
      where: {
        flag_activo: true,
        flag_eliminado: false,
        lda_itinerario_menor: {
          some: {
            lda_itinerario: {
              flag_activo: true,
              flag_eliminado: false,
              iden_itinerario: idItinerario,
            },
            lda_nivel: {
              flag_activo: true,
              flag_eliminado: false,
              iden_nivel: idNivel,
            },
          },
        },
        lda_nivel_menor: {
          some: {
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
          },
        },
      },
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
        lda_itinerario_menor: {
          where: {
            lda_itinerario: {
              iden_itinerario: idItinerario,
              flag_activo: true,
              flag_eliminado: false,
            },
            lda_nivel: {
              flag_activo: true,
              flag_eliminado: false,
              iden_nivel: idNivel,
            },
          },
        },
      },
    });
  }

  async getMenorByItinerarioNivelMenor(
    idItinerario: number,
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
        lda_itinerario_menor: {
          some: {
            lda_itinerario: {
              flag_activo: true,
              flag_eliminado: false,
              iden_itinerario: {
                equals: idItinerario,
              },
            },
            iden_itinerario: {
              equals: idItinerario,
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
        lda_itinerario_menor: {
          where: {
            iden_itinerario: idItinerario,
            iden_menor: idMenor,
            iden_nivel: idNivel,
          },
          select: {
            flag_confirmado: true,
            lda_itinerario: {
              select: {
                desc_titulo: true,
                desc_descripcion: true,
                fech_itinerario: true,
                flag_realizado: true,
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

  async crearItinerario(actividad: ItinerarioData, idEducador: number) {
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
    const itinerarioData: any = {
      desc_titulo: actividad.titulo,
      desc_descripcion: actividad.descripcion,
      fech_itinerario: new Date(actividad.fechaActividad),
      fech_creacion: new Date(dateReal),
      usr_usuario: {
        connect: {
          id: educador.id,
        },
      },
      flag_realizado: actividad.actividadRealizada,
    };

    const itinerarioCreated = await this.prisma.lda_itinerario.create({
      data: itinerarioData,
    });

    if (actividad.enviarATodosNiveles) {
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
          await this.prisma.lda_itinerario_menor.create({
            data: {
              iden_itinerario: itinerarioCreated.iden_itinerario,
              iden_menor: menor.iden_menor,
              iden_nivel: nivel.iden_nivel,
              flag_confirmado: false,
            },
          });
        }
      }
    } else {
      for (const nivelId of actividad.nivelesSeleccionados) {
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
            await this.prisma.lda_itinerario_menor.create({
              data: {
                iden_itinerario: itinerarioCreated.iden_itinerario,
                iden_menor: menor.iden_menor,
                iden_nivel: nivel.iden_nivel,
                flag_confirmado: false,
              },
            });
          }
        }
      }
    }
    return itinerarioCreated;
  }

  async confirmarRealizaActividad(idItinerario: number) {
    return await this.prisma.lda_itinerario.update({
      where: {
        iden_itinerario: idItinerario,
      },
      data: {
        flag_realizado: true,
      },
    });
  }
}
