import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { NewApoderadoData } from './dto/create-usuario.dto';

@Injectable()
export class UsuarioService {
  constructor(private prisma: PrismaService) {}

  async findByRun(run: string) {
    const usuario = await this.prisma.usuario.findFirst({
      where: {
        eliminado: false,
        activo: true,
        AND: {
          persona: {
            run: run,
          },
        },
      },
      include: {
        persona: { include: { TipoIdentificador: true, per_sexo: true } },
        usr_rol: {
          select: { desc_rol: true },
        },
      },
    });
    return usuario;
  }

  async findById(id: number) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { id: id, AND: { eliminado: false, activo: true } },
    });
    return usuario;
  }

  async getAllApoderados() {
    return await this.prisma.usuario.findMany({
      where: {
        eliminado: false,
        usr_rol: {
          desc_rol: {
            equals: 'apoderado',
          },
        },
        persona: {
          flag_eliminado: false,
        },
      },
      select: {
        persona: {
          select: {
            _count: {
              select: {
                lda_menor_lda_menor_iden_per_apoderadoToper_persona: true,
              },
            },
            primerNombre: true,
            apellidoP: true,
            apellidoM: true,
            id: true,
            flag_activo: true,
            desc_email: true,
            desc_tel: true,
            desc_direccion: true,
            run: true,
            char_dv: true,
            lda_menor_lda_menor_iden_per_apoderadoToper_persona: {
              where: {
                flag_activo: true,
                flag_eliminado: false,
              },
              select: {
                lda_jornada: {
                  select: {
                    desc_nombre: true,
                  },
                },
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
                  },
                  select: {
                    lda_nivel: {
                      select: {
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

  async setActivacionApoderado(idApoderado: number, estado: boolean) {
    const usrId = await this.prisma.usuario.findFirst({
      where: {
        idPersona: idApoderado,
      },
      select: {
        id: true,
      },
    });
    await this.prisma.usuario.update({
      data: {
        activo: estado,
      },
      where: {
        id: usrId.id,
        idPersona: idApoderado,
      },
    });
    await this.prisma.persona.update({
      data: {
        flag_activo: estado,
      },
      where: {
        id: idApoderado,
      },
    });
    const menoresApoderado = await this.prisma.menor.findMany({
      where: {
        iden_per_apoderado: idApoderado,
      },
      select: {
        id: true,
      },
    });
    for (const menor of menoresApoderado) {
      await this.prisma.persona.update({
        data: {
          flag_activo: estado,
        },
        where: {
          id: menor.id,
        },
      });
      await this.prisma.menor.update({
        data: {
          flag_activo: estado,
        },
        where: {
          id: menor.id,
        },
      });
      await this.prisma.lda_nivel_menor.updateMany({
        data: {
          flag_activo: estado,
        },
        where: {
          iden_menor: menor.id,
        },
      });
      await this.prisma.lda_vacuna_menor.deleteMany({
        where: {
          iden_menor: menor.id,
        },
      });
    }
    return true;
  }

  async deleteApoderado(idApoderado: number) {
    const usrId = await this.prisma.usuario.findFirst({
      where: {
        idPersona: idApoderado,
      },
      select: {
        id: true,
      },
    });
    await this.prisma.usuario.update({
      data: {
        activo: false,
        eliminado: true,
      },
      where: {
        id: usrId.id,
        idPersona: idApoderado,
      },
    });
    await this.prisma.persona.update({
      data: {
        flag_activo: false,
        flag_eliminado: true,
      },
      where: {
        id: idApoderado,
      },
    });
    const menoresApoderado = await this.prisma.menor.findMany({
      where: {
        iden_per_apoderado: idApoderado,
      },
      select: {
        id: true,
      },
    });
    for (const menor of menoresApoderado) {
      await this.prisma.persona.update({
        data: {
          flag_activo: false,
          flag_eliminado: true,
        },
        where: {
          id: menor.id,
        },
      });
      await this.prisma.menor.update({
        data: {
          flag_activo: false,
          flag_eliminado: true,
        },
        where: {
          id: menor.id,
        },
      });
      await this.prisma.lda_nivel_menor.updateMany({
        data: {
          flag_activo: false,
          flag_eliminado: true,
        },
        where: {
          iden_menor: menor.id,
        },
      });
      await this.prisma.lda_vacuna_menor.deleteMany({
        where: {
          iden_menor: menor.id,
        },
      });
    }
    return true;
  }

  async getSexos() {
    return await this.prisma.per_sexo.findMany();
  }

  async crearNuevoApoderado(apoderado: NewApoderadoData) {
    const isPerCreado = await this.prisma.persona.findFirst({
      where: {
        run: apoderado.rut.split('-')[0],
      },
      select: {
        id: true,
      },
    });
    if (isPerCreado && isPerCreado.id) {
      const usr = await this.prisma.usuario.findFirst({
        where: {
          idPersona: isPerCreado.id,
        },
        select: {
          id: true,
        },
      });
      if (usr && usr.id) {
        await this.prisma.usuario.delete({
          where: {
            id: usr.id,
          },
        });
      }
      await this.prisma.persona.delete({
        where: {
          id: isPerCreado.id,
        },
      });
    }
    const perCreada = await this.prisma.persona.create({
      data: {
        primerNombre: apoderado.nombre,
        apellidoP: apoderado.apellidoP,
        apellidoM: apoderado.apellidoM,
        run: apoderado.rut.split('-')[0],
        char_dv: apoderado.rut.split('-')[1],
        desc_email: null,
        desc_tel: null,
        desc_direccion: null,
        per_sexo: {
          connect: {
            iden_sexo: apoderado.sexo,
          },
        },
        per_nacionalidad: {
          connect: {
            iden_nacionalidad: 1,
          },
        },
        desc_dni: null,
        TipoIdentificador: {
          connect: {
            id: 1,
          },
        },
        flag_activo: true,
        flag_eliminado: false,
      },
    });

    const usrCreado = await this.prisma.usuario.create({
      data: {
        persona: {
          connect: {
            id: perCreada.id,
          },
        },
        usr_rol: {
          connect: {
            iden_rol: 4,
          },
        },
        password: apoderado.password,
        activo: true,
        eliminado: false,
      },
    });

    return usrCreado;
  }
}
