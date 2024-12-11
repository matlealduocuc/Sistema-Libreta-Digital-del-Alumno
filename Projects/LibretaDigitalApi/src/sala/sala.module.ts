import { Module } from '@nestjs/common';
import { SalaService } from './sala.service';
import { SalaController } from './sala.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [SalaController],
  providers: [SalaService, PrismaService],
  exports: [SalaModule],
})
export class SalaModule {}
