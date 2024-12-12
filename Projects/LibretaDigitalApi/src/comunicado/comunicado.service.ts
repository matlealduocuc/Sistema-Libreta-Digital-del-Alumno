import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import {
  ComunicadoData,
  ComunicadoDataEducador,
} from './entities/comunicado.entity';

@Injectable()
export class ComunicadoService {
  constructor(private readonly prisma: PrismaService) {}

  async getTiposComunicado() {
    return (await this.prisma.lda_tipo_comunicado.findMany()).sort(
      (a, b) => a.nmro_orden - b.nmro_orden,
    );
  }

  async getComunicadosByMenor(idMenor: number, idApoderado: number) {
    return await this.prisma.lda_comunicado_menor.findMany({
      where: {
        flag_activo: true,
        lda_nivel: {
          flag_activo: true,
          flag_eliminado: false,
        },
        lda_comunicado: {
          flag_activo: true,
          flag_eliminado: false,
        },
        iden_menor: idMenor,
        lda_menor: {
          flag_activo: true,
          flag_eliminado: false,
          per_persona_lda_menor_iden_per_apoderadoToper_persona: {
            id: idApoderado,
            flag_activo: true,
            flag_eliminado: false,
          },
        },
      },
      select: {
        lda_comunicado: {
          select: {
            iden_comunicado: true,
            desc_titulo: true,
            fech_creacion: true,
            usr_usuario: {
              select: {
                persona: {
                  select: {
                    primerNombre: true,
                    apellidoP: true,
                    apellidoM: true,
                  },
                },
                usr_rol: {
                  select: {
                    desc_rol: true,
                  },
                },
              },
            },
          },
        },
        flag_confirmado: true,
        lda_nivel: {
          select: {
            desc_nombre: true,
          },
        },
      },
      orderBy: {
        lda_comunicado: {
          fech_creacion: 'asc',
        },
      },
    });
  }

  async getComunicadoByMenorComunicado(
    idMenor: number,
    idComunicado: number,
    idApoderado: number,
  ) {
    return await this.prisma.lda_comunicado.findFirst({
      where: {
        iden_comunicado: idComunicado,
        flag_activo: true,
        flag_eliminado: false,
        lda_comunicado_menor: {
          some: {
            flag_activo: true,
            iden_comunicado: {
              equals: idComunicado,
            },
            lda_menor: {
              flag_activo: true,
              flag_eliminado: false,
              id: {
                equals: idMenor,
              },
              per_persona_lda_menor_iden_per_apoderadoToper_persona: {
                id: idApoderado,
                flag_activo: true,
                flag_eliminado: false,
              },
            },
          },
        },
      },
      select: {
        desc_titulo: true,
        desc_texto: true,
        fech_creacion: true,
        iden_archivo: true,
        lda_tipo_comunicado: {
          select: {
            desc_nombre: true,
          },
        },
        usr_usuario: {
          select: {
            usr_rol: {
              select: {
                desc_rol: true,
              },
            },
            persona: {
              select: {
                primerNombre: true,
                apellidoP: true,
                apellidoM: true,
              },
            },
          },
        },
        lda_comunicado_menor: {
          where: {
            iden_comunicado: idComunicado,
            flag_activo: true,
            lda_menor: {
              id: idMenor,
              flag_activo: true,
              flag_eliminado: false,
              per_persona_lda_menor_iden_per_apoderadoToper_persona: {
                id: idApoderado,
                flag_activo: true,
                flag_eliminado: false,
              },
            },
          },
          select: {
            flag_confirmado: true,
            lda_nivel: {
              select: {
                desc_nombre: true,
              },
            },
            lda_menor: {
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
                    lda_nivel: {
                      flag_activo: true,
                      flag_eliminado: false,
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

  async confirmaConocimientoComunicadoMenor(
    idMenor: number,
    idComunicado: number,
    idApoderado: number,
  ) {
    const isApoderado = await this.prisma.menor.findFirst({
      where: {
        id: idMenor,
        iden_per_apoderado: idApoderado,
        flag_activo: true,
        flag_eliminado: false,
        per_persona_lda_menor_iden_per_apoderadoToper_persona: {
          flag_activo: true,
          flag_eliminado: false,
        },
      },
    });
    if (!isApoderado) {
      return false;
    }
    const getIden = await this.prisma.lda_comunicado_menor.findFirst({
      where: {
        iden_menor: idMenor,
        iden_comunicado: idComunicado,
      },
      select: {
        iden_comunicado_menor: true,
      },
    });
    const updated = await this.prisma.lda_comunicado_menor.update({
      data: {
        flag_confirmado: true,
      },
      where: {
        iden_comunicado_menor: getIden.iden_comunicado_menor,
      },
    });
    return updated;
  }

  async subirComunicado(comunicado: ComunicadoData, idEducador: number) {
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
              iden_nivel: comunicado.nivel,
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
    const comunicadoData: any = {
      desc_titulo: comunicado.asunto,
      desc_texto: comunicado.texto,
      fech_creacion: new Date(dateReal),
      usr_usuario: {
        connect: {
          id: educador.id,
        },
      },
      lda_tipo_comunicado: {
        connect: {
          iden_tipo_comunicado: comunicado.tipoComunicado,
        },
      },
    };

    if (comunicado.idArchivo) {
      comunicadoData.lda_archivo = {
        connect: {
          iden_archivo: comunicado.idArchivo,
        },
      };
    }

    const comunicadoCreated = await this.prisma.lda_comunicado.create({
      data: comunicadoData,
    });

    if (comunicado.enviarATodosMenores) {
      const menores = await this.prisma.lda_nivel_menor.findMany({
        where: {
          iden_nivel: comunicado.nivel,
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
        await this.prisma.lda_comunicado_menor.create({
          data: {
            iden_comunicado: comunicadoCreated.iden_comunicado,
            iden_menor: menor.iden_menor,
            iden_nivel: comunicado.nivel,
            flag_confirmado: false,
          },
        });
      }
    } else {
      for (const menorId of comunicado.menoresSeleccionados) {
        const menor = await this.prisma.menor.findFirst({
          where: {
            id: menorId,
            flag_activo: true,
            flag_eliminado: false,
          },
        });

        if (menor) {
          await this.prisma.lda_comunicado_menor.create({
            data: {
              iden_comunicado: comunicadoCreated.iden_comunicado,
              iden_menor: menor.id,
              iden_nivel: comunicado.nivel,
              flag_confirmado: false,
            },
          });
        }
      }
    }
    return comunicadoCreated;
  }

  async subirComunicadoDirector(
    comunicado: ComunicadoDataEducador,
    idUsuario: number,
  ) {
    const educador = await this.prisma.usuario.findFirst({
      where: {
        activo: true,
        eliminado: false,
        id: idUsuario,
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
    const comunicadoData: any = {
      desc_titulo: comunicado.asunto,
      desc_texto: comunicado.texto,
      fech_creacion: new Date(dateReal),
      usr_usuario: {
        connect: {
          id: educador.id,
        },
      },
      lda_tipo_comunicado: {
        connect: {
          iden_tipo_comunicado: comunicado.tipoComunicado,
        },
      },
    };

    if (comunicado.idArchivo) {
      comunicadoData.lda_archivo = {
        connect: {
          iden_archivo: comunicado.idArchivo,
        },
      };
    }

    const comunicadoCreated = await this.prisma.lda_comunicado.create({
      data: comunicadoData,
    });

    if (comunicado.enviarATodosNiveles) {
      const niveles = await this.prisma.lda_nivel.findMany({
        where: {
          flag_activo: true,
          flag_eliminado: false,
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
          await this.prisma.lda_comunicado_menor.create({
            data: {
              iden_comunicado: comunicadoCreated.iden_comunicado,
              iden_menor: menor.iden_menor,
              iden_nivel: nivel.iden_nivel,
              flag_confirmado: false,
            },
          });
        }
      }
    } else {
      if (comunicado.enviarATodosMenores) {
        const menores = await this.prisma.lda_nivel_menor.findMany({
          where: {
            iden_nivel: comunicado.nivel,
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
          await this.prisma.lda_comunicado_menor.create({
            data: {
              iden_comunicado: comunicadoCreated.iden_comunicado,
              iden_menor: menor.iden_menor,
              iden_nivel: comunicado.nivel,
              flag_confirmado: false,
            },
          });
        }
      } else {
        for (const menorId of comunicado.menoresSeleccionados) {
          const menor = await this.prisma.menor.findFirst({
            where: {
              id: menorId,
              flag_activo: true,
              flag_eliminado: false,
            },
          });

          if (menor) {
            await this.prisma.lda_comunicado_menor.create({
              data: {
                iden_comunicado: comunicadoCreated.iden_comunicado,
                iden_menor: menor.id,
                iden_nivel: comunicado.nivel,
                flag_confirmado: false,
              },
            });
          }
        }
      }
    }
    return comunicadoCreated;
  }

  async getComunicadosByNivel(idNivel: number, idPersona: number) {
    const rol = await this.prisma.usuario.findFirst({
      where: {
        idPersona: idPersona,
        activo: true,
        eliminado: false,
      },
      select: {
        usr_rol: {
          select: {
            desc_rol: true,
          },
        },
      },
    });
    if (rol.usr_rol.desc_rol.trim().toUpperCase() === 'EDUCADOR') {
      return await this.prisma.lda_comunicado.findMany({
        where: {
          flag_eliminado: false,
          usr_usuario: {
            id: idPersona,
            activo: true,
            eliminado: false,
          },
          lda_comunicado_menor: {
            some: {
              flag_activo: true,
              iden_nivel: {
                equals: idNivel,
              },
              lda_nivel: {
                iden_nivel: idNivel,
                flag_activo: true,
                flag_eliminado: false,
              },
            },
          },
        },
        select: {
          iden_comunicado: true,
          desc_titulo: true,
          desc_texto: true,
          flag_activo: true,
          fech_creacion: true,
        },
        orderBy: {
          fech_creacion: 'asc',
        },
      });
    } else {
      return await this.prisma.lda_comunicado.findMany({
        where: {
          flag_eliminado: false,
          lda_comunicado_menor: {
            some: {
              flag_activo: true,
              iden_nivel: {
                equals: idNivel,
              },
              lda_nivel: {
                iden_nivel: idNivel,
                flag_activo: true,
                flag_eliminado: false,
              },
            },
          },
        },
        select: {
          iden_comunicado: true,
          desc_titulo: true,
          desc_texto: true,
          flag_activo: true,
          fech_creacion: true,
        },
        orderBy: {
          fech_creacion: 'asc',
        },
      });
    }
  }

  async setActivacionComunicado(idComunicado: number, estado: boolean) {
    return await this.prisma.lda_comunicado.update({
      data: {
        flag_activo: estado,
      },
      where: {
        iden_comunicado: idComunicado,
      },
    });
  }

  async deleteComunicado(idComunicado: number) {
    return await this.prisma.lda_comunicado.update({
      data: {
        flag_activo: false,
        flag_eliminado: true,
      },
      where: {
        iden_comunicado: idComunicado,
      },
    });
  }
}
