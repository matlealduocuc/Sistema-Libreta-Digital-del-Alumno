import { Module } from '@nestjs/common';
import { ItinerarioService } from './itinerario.service';
import { ItinerarioController } from './itinerario.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ItinerarioController],
  providers: [ItinerarioService, PrismaService],
  exports: [ItinerarioModule],
})
export class ItinerarioModule {}
