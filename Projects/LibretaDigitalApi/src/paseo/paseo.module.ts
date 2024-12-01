import { Module } from '@nestjs/common';
import { PaseoService } from './paseo.service';
import { PaseoController } from './paseo.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [PaseoController],
  providers: [PaseoService, PrismaService],
  exports: [PaseoModule],
})
export class PaseoModule {}
