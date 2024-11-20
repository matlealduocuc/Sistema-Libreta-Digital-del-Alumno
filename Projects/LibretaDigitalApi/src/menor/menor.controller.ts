import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { MenorService } from './menor.service';
import { Request, Response } from 'express';
import { Rol } from 'src/common/enums/rol.enum';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import formatFecha1 from 'src/common/functions/formatFecha1';

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

  @Get('getMenoresVacunasByApoderado')
  @Auth(Rol.APODERADO)
  async getMenoresVacunasByApoderado(@ActiveUser() user) {
    const menores = await this.menorService.getMenoresVacunasByApoderado(
      +user.idPersona,
    );
    const menoresDto = menores.map((menor) => ({
      id: menor.id,
      nombre:
        menor.per_persona.apellidoM != null
          ? menor.per_persona.primerNombre +
            ' ' +
            menor.per_persona.apellidoP +
            ' ' +
            menor.per_persona.apellidoM
          : menor.per_persona.primerNombre + ' ' + menor.per_persona.apellidoP,
      autorizado: menor.lda_vacuna_menor[0]?.flag_autorizado ?? null,
      nivel: menor.lda_nivel_menor[0]?.lda_nivel?.desc_nombre,
    }));
    return menoresDto;
  }

  @Get('getMenorVacunasByMenorAndApoderado/:id')
  @Auth(Rol.APODERADO)
  async getMenorVacunasByMenorAndApoderado(
    @ActiveUser() user,
    @Param('id') idMenor: string,
  ) {
    const menorVacuna =
      await this.menorService.getMenorVacunasByMenorAndApoderado(
        +idMenor,
        +user.idPersona,
      );
    const apoderado =
      menorVacuna.per_persona_lda_menor_iden_per_apoderadoToper_persona;

    const menoresDto = {
      idMenor: menorVacuna.id,
      nombreMenor:
        menorVacuna.per_persona.apellidoM != null
          ? menorVacuna.per_persona.primerNombre +
            ' ' +
            menorVacuna.per_persona.apellidoP +
            ' ' +
            menorVacuna.per_persona.apellidoM
          : menorVacuna.per_persona.primerNombre +
            ' ' +
            menorVacuna.per_persona.apellidoP,

      nivel: menorVacuna.lda_nivel_menor[0]?.lda_nivel?.desc_nombre,
      nombreVacuna:
        menorVacuna.lda_vacuna_menor[0]?.lda_vacuna?.desc_nombre +
        ' ' +
        formatFecha1(
          menorVacuna.lda_vacuna_menor[0]?.lda_vacuna?.fech_vacunacion.toISOString(),
        ),
      idVacuna: menorVacuna.lda_vacuna_menor[0]?.lda_vacuna?.iden_vacuna,
      nombreApoderado:
        apoderado.apellidoM != null
          ? apoderado.primerNombre +
            ' ' +
            apoderado.apellidoP +
            ' ' +
            apoderado.apellidoM
          : apoderado.primerNombre + ' ' + apoderado.apellidoP,

      autorizado: menorVacuna.lda_vacuna_menor[0]?.flag_autorizado ?? null,
    };
    return menoresDto;
  }

  @Post('autorizarVacunaMenor')
  @Auth(Rol.APODERADO)
  async autorizarVacunaMenor(
    @ActiveUser() user,
    @Body()
    body: {
      idMenor: number;
      idVacuna: number;
    },
  ) {
    const { idMenor, idVacuna } = body;
    const isAutorizado = await this.menorService.autorizarVacunaMenor(
      idMenor,
      idVacuna,
      +user.idPersona,
    );
    return isAutorizado;
  }

  @Get('getMenoresPaseosByApoderado')
  @Auth(Rol.APODERADO)
  async getMenoresPaseosByApoderado(@ActiveUser() user) {
    const paseos = await this.menorService.getMenoresPaseosByApoderado(
      +user.idPersona,
    );
    const paseosDto = paseos.map((paseo) => {
      const menor = paseo.lda_paseo_menor[0]?.lda_menor;
      return {
        idMenor: menor.id,
        idPaseo: paseo.iden_paseo,
        nombre:
          menor.per_persona.apellidoM != null
            ? menor.per_persona.primerNombre +
              ' ' +
              menor.per_persona.apellidoP +
              ' ' +
              menor.per_persona.apellidoM
            : menor.per_persona.primerNombre +
              ' ' +
              menor.per_persona.apellidoP,
        nivel: menor.lda_nivel_menor[0]?.lda_nivel?.desc_nombre,
        autorizado: paseo.lda_paseo_menor[0]?.flag_autorizado ?? null,
        paseo: paseo.desc_titulo,
        fechaInicio: paseo.fech_inicio,
        fechaFin: paseo.fech_fin,
      };
    });
    return paseosDto;
  }
}
