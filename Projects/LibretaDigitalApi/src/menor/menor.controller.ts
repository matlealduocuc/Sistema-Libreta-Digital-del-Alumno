import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MenorService } from './menor.service';
import { Rol } from 'src/common/enums/rol.enum';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import formatFecha1 from 'src/common/functions/formatFecha1';
import formatFecha2 from 'src/common/functions/formatFecha2';

@Controller('menor')
export class MenorController {
  constructor(private readonly menorService: MenorService) {}

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
    const menoresDto = menores.map((menor) => {
      const menorPer = menor;
      return {
        id: menorPer.id,
        nombre:
          menorPer.per_persona.apellidoM != null
            ? menorPer.per_persona.primerNombre +
              ' ' +
              menorPer.per_persona.apellidoP +
              ' ' +
              menorPer.per_persona.apellidoM
            : menorPer.per_persona.primerNombre +
              ' ' +
              menorPer.per_persona.apellidoP,
        nivel: menor.lda_nivel_menor[0]?.lda_nivel?.desc_nombre,
        vacuna: menor.lda_vacuna_menor[0]?.lda_vacuna.desc_nombre,
        fechaVacuna: formatFecha2(
          menor.lda_vacuna_menor[0]?.lda_vacuna.fech_vacunacion.toISOString(),
        ),
        autorizado: menor.lda_vacuna_menor[0]?.flag_autorizado ?? null,
      };
    });

    menoresDto.sort((a, b) => {
      if (a.autorizado === false) return -1;
      if (b.autorizado === false) return 1;
      if (a.autorizado === true) return -1;
      if (b.autorizado === true) return 1;
      return 0;
    });
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
      nombreVacuna: menorVacuna.lda_vacuna_menor[0]?.lda_vacuna?.desc_nombre,
      fechaVacuna: formatFecha1(
        menorVacuna.lda_vacuna_menor[0]?.lda_vacuna?.fech_vacunacion.toISOString(),
      ),
      idVacuna: menorVacuna.lda_vacuna_menor[0]?.lda_vacuna?.iden_vacuna,
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
      const menor = paseo.lda_menor;
      return {
        idMenor: menor?.id,
        idPaseo: paseo.lda_paseo.iden_paseo,
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
        autorizado: paseo.flag_autorizado ?? null,
        paseo: paseo.lda_paseo.desc_titulo,
        tipoPaseo: paseo.lda_paseo.lda_tipo_paseo?.desc_tipo_paseo,
        fechaInicio: formatFecha2(paseo.lda_paseo.fech_inicio.toISOString()),
        fechaFin: formatFecha2(paseo.lda_paseo.fech_fin.toISOString()),
      };
    });

    paseosDto.sort((a, b) => {
      if (a.autorizado === b.autorizado) {
        return (
          new Date(a.fechaInicio).getTime() - new Date(b.fechaInicio).getTime()
        );
      }
      if (a.autorizado === false) return -1;
      if (b.autorizado === false) return 1;
      if (a.autorizado === true) return -1;
      if (b.autorizado === true) return 1;
      return 0;
    });

    return paseosDto;
  }

  @Get('getMenorPaseoByMenorPaseoAndApoderado/:idMenor/:idPaseo')
  @Auth(Rol.APODERADO)
  async getMenorPaseoByMenorPaseoAndApoderado(
    @ActiveUser() user,
    @Param('idMenor') idMenor: string,
    @Param('idPaseo') idPaseo: string,
  ) {
    const paseo = await this.menorService.getMenorPaseoByMenorPaseoAndApoderado(
      +idMenor,
      +idPaseo,
      +user.idPersona,
    );
    const menor = paseo.per_persona;
    const paseoDto = {
      nombreMenor:
        menor.apellidoM != null
          ? menor.primerNombre + ' ' + menor.apellidoP + ' ' + menor.apellidoM
          : menor.primerNombre + ' ' + menor.apellidoP,

      nivel: paseo.lda_nivel_menor[0]?.lda_nivel?.desc_nombre,
      tipoPaseo:
        paseo.lda_paseo_menor[0]?.lda_paseo?.lda_tipo_paseo?.desc_tipo_paseo,
      nombrePaseo: paseo.lda_paseo_menor[0]?.lda_paseo?.desc_titulo,
      descPaseo: paseo.lda_paseo_menor[0]?.lda_paseo?.desc_descripcion,
      fechaInicio: formatFecha2(
        paseo.lda_paseo_menor[0]?.lda_paseo?.fech_inicio.toISOString(),
      ),
      fechaFin: formatFecha2(
        paseo.lda_paseo_menor[0]?.lda_paseo?.fech_fin.toISOString(),
      ),
      autorizado: paseo.lda_paseo_menor[0]?.flag_autorizado ?? null,
    };
    return paseoDto;
  }

  @Post('autorizarPaseoMenor')
  @Auth(Rol.APODERADO)
  async autorizarPaseoMenor(
    @ActiveUser() user,
    @Body()
    body: {
      idMenor: number;
      idPaseo: number;
    },
  ) {
    const { idMenor, idPaseo } = body;
    const isAutorizado = await this.menorService.autorizarPaseoMenor(
      idMenor,
      idPaseo,
      +user.idPersona,
    );
    return isAutorizado;
  }

  @Get('getMenoresReunionesByApoderado')
  @Auth(Rol.APODERADO)
  async getMenoresReunionesByApoderado(@ActiveUser() user) {
    const reuniones = await this.menorService.getMenoresReunionesByApoderado(
      +user.idPersona,
    );
    const reunionesDto = reuniones.map((reunion) => {
      const menor = reunion.lda_menor;
      return {
        idMenor: menor.id,
        idReunion: reunion.lda_reunion.iden_reunion,
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
        reunion: reunion.lda_reunion.desc_titulo,
        sala: reunion.lda_reunion.lda_sala?.desc_nombre,
        fechaReunion: formatFecha2(
          reunion.lda_reunion.fech_reunion.toISOString(),
        ),
        confirmado: reunion.flag_confirmado ?? null,
      };
    });

    reunionesDto.sort((a, b) => {
      if (a.confirmado === b.confirmado) {
        return (
          new Date(a.fechaReunion).getTime() -
          new Date(b.fechaReunion).getTime()
        );
      }
      if (a.confirmado === false) return -1;
      if (b.confirmado === false) return 1;
      if (a.confirmado === true) return -1;
      if (b.confirmado === true) return 1;
      return 0;
    });

    return reunionesDto;
  }

  @Get('getMenorReunionByMenorPaseoAndApoderado/:idMenor/:idReunion')
  @Auth(Rol.APODERADO)
  async getMenorReunionByMenorPaseoAndApoderado(
    @ActiveUser() user,
    @Param('idMenor') idMenor: string,
    @Param('idReunion') idReunion: string,
  ) {
    const reunion =
      await this.menorService.getMenorReunionByMenorPaseoAndApoderado(
        +idMenor,
        +idReunion,
        +user.idPersona,
      );
    const menor = reunion.per_persona;
    const reunionDto = {
      nombreMenor:
        menor.apellidoM != null
          ? menor.primerNombre + ' ' + menor.apellidoP + ' ' + menor.apellidoM
          : menor.primerNombre + ' ' + menor.apellidoP,

      nivel: reunion.lda_nivel_menor[0]?.lda_nivel?.desc_nombre,
      tituloReunion: reunion.lda_reunion_menor[0]?.lda_reunion?.desc_titulo,
      temasTratar:
        reunion.lda_reunion_menor[0]?.lda_reunion?.lda_reunion_tema.map(
          (tema) => tema.desc_tema,
        ),
      fechaReunion: formatFecha2(
        reunion.lda_reunion_menor[0]?.lda_reunion?.fech_reunion.toISOString(),
      ),
      sala: reunion.lda_reunion_menor[0]?.lda_reunion?.lda_sala?.desc_nombre,
      confirmado: reunion.lda_reunion_menor[0]?.flag_confirmado ?? null,
    };
    return reunionDto;
  }

  @Post('confirmaReunionMenor')
  @Auth(Rol.APODERADO)
  async confirmaReunionMenor(
    @ActiveUser() user,
    @Body()
    body: {
      idMenor: number;
      idReunion: number;
    },
  ) {
    const { idMenor, idReunion } = body;
    const isAutorizado = await this.menorService.confirmaReunionMenor(
      idMenor,
      idReunion,
      +user.idPersona,
    );
    return isAutorizado;
  }

  @Get('getMenoresItinerariosByApoderado')
  @Auth(Rol.APODERADO)
  async getMenoresItinerariosByApoderado(@ActiveUser() user) {
    const itinerarios =
      await this.menorService.getMenoresItinerariosByApoderado(+user.idPersona);
    const itinerariosDto = itinerarios.map((itinerario) => {
      const menor = itinerario.lda_menor;
      return {
        idMenor: menor.id,
        idItinerario: itinerario.lda_itinerario.iden_itinerario,
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
        actividad: itinerario.lda_itinerario.desc_titulo,
        fechaItinerario: formatFecha1(
          itinerario.lda_itinerario.fech_itinerario.toISOString(),
        ),
        realizado: itinerario.lda_itinerario.flag_realizado ?? null,
        confirmado: itinerario.flag_confirmado ?? null,
      };
    });

    itinerariosDto.sort((a, b) => {
      if (a.confirmado === b.confirmado) {
        return (
          new Date(a.fechaItinerario).getTime() -
          new Date(b.fechaItinerario).getTime()
        );
      }
      if (a.confirmado === false) return -1;
      if (b.confirmado === false) return 1;
      if (a.confirmado === true) return -1;
      if (b.confirmado === true) return 1;
      return 0;
    });

    return itinerariosDto;
  }

  @Get('getMenorItinerarioByMenorPaseoAndApoderado/:idMenor/:idItinerario')
  @Auth(Rol.APODERADO)
  async getMenorItinerarioByMenorPaseoAndApoderado(
    @ActiveUser() user,
    @Param('idMenor') idMenor: string,
    @Param('idItinerario') idItinerario: string,
  ) {
    const itinerario =
      await this.menorService.getMenorItinerarioByMenorPaseoAndApoderado(
        +idMenor,
        +idItinerario,
        +user.idPersona,
      );
    const menor = itinerario.per_persona;
    const itinerarioDto = {
      nombreMenor:
        menor.apellidoM != null
          ? menor.primerNombre + ' ' + menor.apellidoP + ' ' + menor.apellidoM
          : menor.primerNombre + ' ' + menor.apellidoP,

      nivel: itinerario.lda_nivel_menor[0]?.lda_nivel?.desc_nombre,
      tituloActividad:
        itinerario.lda_itinerario_menor[0]?.lda_itinerario?.desc_titulo,
      fechaActividad: formatFecha1(
        itinerario.lda_itinerario_menor[0]?.lda_itinerario?.fech_itinerario.toISOString(),
      ),
      descActividad:
        itinerario.lda_itinerario_menor[0]?.lda_itinerario?.desc_descripcion,
      confirmado: itinerario.lda_itinerario_menor[0]?.flag_confirmado ?? null,
      realizado:
        itinerario.lda_itinerario_menor[0]?.lda_itinerario.flag_realizado ??
        null,
    };
    return itinerarioDto;
  }

  @Post('confirmaItinerarioMenor')
  @Auth(Rol.APODERADO)
  async confirmaItinerarioMenor(
    @ActiveUser() user,
    @Body()
    body: {
      idMenor: number;
      idItinerario: number;
    },
  ) {
    const { idMenor, idItinerario } = body;
    const isAutorizado = await this.menorService.confirmaItinerarioMenor(
      idMenor,
      idItinerario,
      +user.idPersona,
    );
    return isAutorizado;
  }

  @Get('getMenoresByApoderado')
  @Auth(Rol.APODERADO)
  async getMenoresByApoderado(@ActiveUser() user) {
    const menores = await this.menorService.getMenoresByApoderado(
      +user.idPersona,
    );
    const menoresDto = menores.map((menor) => {
      return {
        key: menor.id,
        text:
          menor.per_persona.apellidoM != null
            ? menor.per_persona.primerNombre +
              ' ' +
              menor.per_persona.apellidoP +
              ' ' +
              menor.per_persona.apellidoM
            : menor.per_persona.primerNombre +
              ' ' +
              menor.per_persona.apellidoP,
      };
    });

    return menoresDto;
  }
}
