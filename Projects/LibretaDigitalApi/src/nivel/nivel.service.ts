import { Injectable } from '@nestjs/common';
import { CreateNivelDto } from './dto/create-nivel.dto';
import { UpdateNivelDto } from './dto/update-nivel.dto';

@Injectable()
export class NivelService {
  create(createNivelDto: CreateNivelDto) {
    return 'This action adds a new nivel';
  }

  findAll() {
    return `This action returns all nivel`;
  }

  findOne(id: number) {
    return `This action returns a #${id} nivel`;
  }

  update(id: number, updateNivelDto: UpdateNivelDto) {
    return `This action updates a #${id} nivel`;
  }

  remove(id: number) {
    return `This action removes a #${id} nivel`;
  }
}
