import { Module } from '@nestjs/common';
import { MenorController } from './menor.controller';
import { MenorService } from './menor.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [MenorController],
  providers: [MenorService, PrismaService],
})
export class MenorModule {}
