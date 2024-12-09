import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ReunionApoderadoData } from './entities/reunion-apoderado.entity';

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

  async getNivelesByReunion(idReunion: number, idEducador: number) {
    return await this.prisma.lda_nivel.findMany({
      where: {
        flag_activo: true,
        flag_eliminado: false,
        lda_reunion_menor: {
          some: {
            lda_reunion: {
              flag_activo: true,
              flag_eliminado: false,
              iden_reunion: idReunion,
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

  async getMenoresByReunionNivel(
    idReunion: number,
    idNivel: number,
    idEducador: number,
  ) {
    return await this.prisma.menor.findMany({
      where: {
        flag_activo: true,
        flag_eliminado: false,
        lda_reunion_menor: {
          some: {
            lda_reunion: {
              flag_activo: true,
              flag_eliminado: false,
              iden_reunion: idReunion,
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
        lda_reunion_menor: {
          where: {
            lda_reunion: {
              iden_reunion: idReunion,
              flag_activo: true,
              flag_eliminado: false,
            },
          },
        },
      },
    });
  }

  async getMenorByReunionNivelMenor(
    idReunion: number,
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
        lda_reunion_menor: {
          some: {
            lda_reunion: {
              flag_activo: true,
              flag_eliminado: false,
              iden_reunion: {
                equals: idReunion,
              },
            },
            iden_reunion: {
              equals: idReunion,
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
        lda_reunion_menor: {
          where: {
            iden_reunion: idReunion,
            iden_menor: idMenor,
            iden_nivel: idNivel,
          },
          select: {
            flag_confirmado: true,
            lda_reunion: {
              select: {
                desc_titulo: true,
                lda_reunion_tema: {
                  where: {
                    flag_eliminado: false,
                  },
                },
                lda_sala: {
                  select: {
                    desc_nombre: true,
                  },
                },
                fech_reunion: true,
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

  async crearReunion(reunion: ReunionApoderadoData, idEducador: number) {
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
    const reunionData: any = {
      desc_titulo: reunion.titulo,
      fech_reunion: new Date(reunion.fechaReunion),
      lda_sala: {
        connect: {
          iden_sala: reunion.salaReunion,
        },
      },
      usr_usuario: {
        connect: {
          id: educador.id,
        },
      },
      fech_creacion: new Date(dateReal),
    };

    const reunionCreated = await this.prisma.lda_reunion.create({
      data: reunionData,
    });

    await this.prisma.lda_reunion_tema.createMany({
      data: reunion.temas.map((tema: string) => ({
        desc_tema: tema,
        iden_reunion: reunionCreated.iden_reunion,
      })),
    });

    if (reunion.enviarATodosNiveles) {
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
          await this.prisma.lda_reunion_menor.create({
            data: {
              iden_reunion: reunionCreated.iden_reunion,
              iden_menor: menor.iden_menor,
              iden_nivel: nivel.iden_nivel,
              flag_confirmado: false,
            },
          });
        }
      }
    } else {
      for (const nivelId of reunion.nivelesSeleccionados) {
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
            await this.prisma.lda_reunion_menor.create({
              data: {
                iden_reunion: reunionCreated.iden_reunion,
                iden_menor: menor.iden_menor,
                iden_nivel: nivel.iden_nivel,
                flag_confirmado: false,
              },
            });
          }
        }
      }
    }
    return reunionCreated;
  }
}
