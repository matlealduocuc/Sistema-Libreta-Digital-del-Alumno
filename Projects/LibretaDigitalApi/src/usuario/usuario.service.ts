import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

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
        activo: true,
        eliminado: false,
        usr_rol: {
          desc_rol: {
            equals: 'apoderado',
          },
        },
        persona: {
          flag_activo: true,
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
          },
        },
      },
    });
  }
}
