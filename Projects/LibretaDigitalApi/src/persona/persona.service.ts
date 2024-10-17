import { Injectable } from '@nestjs/common';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PersonaService {
  constructor(private readonly prisma: PrismaService) {}

  create(createPersonaDto: CreatePersonaDto) {
    return 'This action adds a new persona';
  }

  findAll() {
    return `This action returns all persona`;
  }

  async findOneById(id: number) {
    const persona = await this.prisma.persona.findUnique({
      where: { id: +id, AND: { flag_eliminado: false } },
    });
    return persona;
  }

  async actualizar(id: number, updatePersonaDto: UpdatePersonaDto) {
    const personaReturn = await this.prisma.persona.update({
      where: {
        id: +id,
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
