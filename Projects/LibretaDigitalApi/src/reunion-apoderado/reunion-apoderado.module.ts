import { Module } from '@nestjs/common';
import { ReunionApoderadoService } from './reunion-apoderado.service';
import { ReunionApoderadoController } from './reunion-apoderado.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ReunionApoderadoController],
  providers: [ReunionApoderadoService, PrismaService],
  exports: [ReunionApoderadoModule],
})
export class ReunionApoderadoModule {}
