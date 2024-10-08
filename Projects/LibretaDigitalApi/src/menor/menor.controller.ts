import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { MenorService } from './menor.service';
import { Request, Response } from 'express';
import { CreateMenorDTO } from './dto/createMenor.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('menor')
@ApiTags('menor')
export class MenorController {
  menorService: MenorService;

  constructor(menorService: MenorService) {
    this.menorService = menorService;
  }

  @Get('get')
  async getMenores(@Req() request: Request, @Res() response: Response) {
    let menores = await this.menorService.getMenores();
    response.status(200).json(menores);
  }

  @Get('get/:id')
  getMenor(@Param('id', ParseIntPipe) id: number, @Res() response: Response) {
    let menor = this.menorService.getMenor(id);
    response.status(200).json(menor);
  }

  @Post('create')
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
    }),
  )
  createMenor(@Body() menor: CreateMenorDTO) {
    return menor;
  }
}
