import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class MenorService {
  constructor(private prisma: PrismaService) {}

  async getMenores() {
    let menores = await this.prisma.menor.findMany();
    return menores;
  }

  getMenor(id: number) {
    return this.prisma.menor.findUnique({
      where: { id: id },
    });
  }
}
