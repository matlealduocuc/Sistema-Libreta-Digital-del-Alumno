import { Injectable } from '@nestjs/common';
import { UpdatePersonaDto } from './dto/update-persona.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PersonaService {
  constructor(private readonly prisma: PrismaService) {}

  async findOneById(id: number) {
    const persona = await this.prisma.persona.findUnique({
      where: { id: +id, AND: { flag_eliminado: false } },
    });
    return persona;
  }

  async actualizar(updatePersonaDto: UpdatePersonaDto) {
    const personaReturn = await this.prisma.persona.update({
      where: {
        id: +updatePersonaDto.id,
      },
      data: {
        desc_email: updatePersonaDto.email,
        desc_tel: updatePersonaDto.phone,
        desc_direccion: updatePersonaDto.address,
      },
    });
    return personaReturn;
  }

  remove(id: number) {
    return `This action removes a #${id} persona`;
  }
}
