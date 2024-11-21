import { Module } from '@nestjs/common';
import { NivelService } from './nivel.service';
import { NivelController } from './nivel.controller';

@Module({
  controllers: [NivelController],
  providers: [NivelService],
})
export class NivelModule {}
