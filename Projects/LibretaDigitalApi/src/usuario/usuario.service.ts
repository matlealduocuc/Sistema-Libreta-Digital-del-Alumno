import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsuarioService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const usuarios = await this.prisma.usuario.findMany({
      // where: { activo: true },
      select: {
        id: true,
        idPersona: true,
        activo: true,
        eliminado: true,
        persona: true,
      },
    });
    return usuarios;
  }

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
}
