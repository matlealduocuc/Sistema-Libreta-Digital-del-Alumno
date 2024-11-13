import { Module } from '@nestjs/common';
import { ComunicadoService } from './comunicado.service';
import { ComunicadoController } from './comunicado.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ComunicadoController],
  providers: [ComunicadoService, PrismaService],
  exports: [ComunicadoService],
})
export class ComunicadoModule {}
