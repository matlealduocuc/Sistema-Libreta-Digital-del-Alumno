import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsuarioService {
  constructor(private prisma: PrismaService) {}

  create(createUsuarioDto: CreateUsuarioDto) {
    return 'This action adds a new usuario';
  }

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
        AND: {
          persona: {
            run: run,
          },
        },
      },
      include: { persona: { include: { TipoIdentificador: true } } },
    });
    return usuario;
  }

  async findById(id: number) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { id: id, AND: { eliminado: false, activo: true } },
    });
    return usuario;
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return `This action updates a #${id} usuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }
}
