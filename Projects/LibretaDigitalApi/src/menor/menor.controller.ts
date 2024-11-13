import { Controller, Get, Param, ParseIntPipe, Req, Res } from '@nestjs/common';
import { MenorService } from './menor.service';
import { Request, Response } from 'express';

@Controller('menor')
export class MenorController {
  constructor(private readonly menorService: MenorService) {}

  @Get('get')
  async getMenores(@Req() request: Request, @Res() response: Response) {
    const menores = await this.menorService.getMenores();
    response.status(200).json(menores);
  }

  @Get('get/:id')
  getMenor(@Param('id', ParseIntPipe) id: number, @Res() response: Response) {
    const menor = this.menorService.getMenor(id);
    response.status(200).json(menor);
  }

  @Get('getSelectMenoresApoderadoByIdNivel/:id')
  async getSelectMenoresApoderadoByIdNivel(@Param('id') idNivel: string) {
    return await this.menorService.getSelectMenoresApoderadoByIdNivel(+idNivel);
  }
}
