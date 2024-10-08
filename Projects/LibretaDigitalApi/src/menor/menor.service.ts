import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class MenorService {
  constructor(private prisma: PrismaService) {}

  async getMenores() {
    console.log('entré');
    let menores = await this.prisma.menor.findMany();
    return menores;
  }

  getMenor(id: number) {
    return {
      id: id,
      nombre: 'Alejandro',
      apellidoP: 'Paterno',
      apellidoM: 'Materno',
      edad: '3',
    };
  }
}
