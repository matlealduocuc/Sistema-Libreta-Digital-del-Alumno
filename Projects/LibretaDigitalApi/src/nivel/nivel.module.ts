import { Module } from '@nestjs/common';
import { NivelService } from './nivel.service';
import { NivelController } from './nivel.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [NivelController],
  providers: [NivelService, PrismaService],
  exports: [NivelModule],
})
export class NivelModule {}
