import { Controller, Get, Param } from '@nestjs/common';
import { ItinerarioService } from './itinerario.service';
import formatFecha2 from 'src/common/functions/formatFecha2';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Rol } from 'src/common/enums/rol.enum';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import formatFecha1 from 'src/common/functions/formatFecha1';

@Controller('itinerario')
export class ItinerarioController {
  constructor(private readonly itinerarioService: ItinerarioService) {}

  @Get('getItinerariosByEducador')
  @Auth(Rol.EDUCADOR)
  async getItinerariosByEducador(@ActiveUser() user) {
    const itinerarios = await this.itinerarioService.getItinerariosByEducador(
      +user.idPersona,
    );
    const itinerariosDto = itinerarios.map((itinerario) => {
      return {
        idItinerario: itinerario.iden_itinerario,
        tituloActividad: itinerario.desc_titulo,
        fechaItinerario: formatFecha2(itinerario.fech_itinerario.toISOString()),
      };
    });

    itinerariosDto.sort((a, b) => {
      return (
        new Date(a.fechaItinerario).getTime() -
        new Date(b.fechaItinerario).getTime()
      );
    });
    return itinerariosDto;
  }

  @Get('getNivelesByItinerario/:idItinerario')
  @Auth(Rol.EDUCADOR)
  async getNivelesByItinerario(
    @ActiveUser() user,
    @Param('idItinerario') idItinerario: string,
  ) {
    const niveles = await this.itinerarioService.getNivelesByItinerario(
      +idItinerario,
      +user.idPersona,
    );
    const nivelesDto = niveles.map((nivel) => {
      return {
        idNivel: nivel.iden_nivel,
        descNombre: nivel.desc_nombre,
        cantidadMenores: nivel._count.lda_nivel_menor,
      };
    });

    return nivelesDto;
  }

  @Get('getMenoresByItinerarioNivel/:idItinerario/:idNivel')
  @Auth(Rol.EDUCADOR)
  async getMenoresByItinerarioNivel(
    @ActiveUser() user,
    @Param('idItinerario') idItinerario: string,
    @Param('idNivel') idNivel: string,
  ) {
    const menores = await this.itinerarioService.getMenoresByItinerarioNivel(
      +idItinerario,
      +idNivel,
      +user.idPersona,
    );
    const menoresDto = menores.map((menor) => {
      const apoderado =
        menor.per_persona_lda_menor_iden_per_apoderadoToper_persona;
      return {
        idMenor: menor.id,
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
        nombreApoderado:
          apoderado.apellidoM != null
            ? apoderado.primerNombre +
              ' ' +
              apoderado.apellidoP +
              ' ' +
              apoderado.apellidoM
            : apoderado.primerNombre + ' ' + apoderado.apellidoP,
        confirmado: menor.lda_itinerario_menor[0].flag_confirmado,
      };
    });

    return menoresDto;
  }

  @Get('getMenorByItinerarioNivelMenor/:idItinerario/:idNivel/:idMenor')
  @Auth(Rol.EDUCADOR)
  async getMenorByItinerarioNivelMenor(
    @ActiveUser() user,
    @Param('idItinerario') idItinerario: string,
    @Param('idNivel') idNivel: string,
    @Param('idMenor') idMenor: string,
  ) {
    const itinerario =
      await this.itinerarioService.getMenorByItinerarioNivelMenor(
        +idItinerario,
        +idNivel,
        +idMenor,
        +user.idPersona,
      );
    const menor = itinerario.per_persona;
    const apoderado =
      itinerario.per_persona_lda_menor_iden_per_apoderadoToper_persona;
    const itinerarioDto = {
      nombreMenor:
        menor.apellidoM != null
          ? menor.primerNombre + ' ' + menor.apellidoP + ' ' + menor.apellidoM
          : menor.primerNombre + ' ' + menor.apellidoP,
      nombreApoderado:
        apoderado.apellidoM != null
          ? apoderado.primerNombre +
            ' ' +
            apoderado.apellidoP +
            ' ' +
            apoderado.apellidoM
          : apoderado.primerNombre + ' ' + apoderado.apellidoP,
      telApoderado: apoderado.desc_tel,
      emailApoderado: apoderado.desc_email,
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
}
