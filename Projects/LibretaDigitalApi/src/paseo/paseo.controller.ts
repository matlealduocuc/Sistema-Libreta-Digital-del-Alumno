import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PaseoService } from './paseo.service';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Rol } from 'src/common/enums/rol.enum';
import formatFecha2 from 'src/common/functions/formatFecha2';
import { PaseoData } from './entities/paseo.entity';

@Controller('paseo')
export class PaseoController {
  constructor(private readonly paseoService: PaseoService) {}

  @Get('getPaseosByEducador')
  @Auth(Rol.EDUCADOR)
  async getPaseosByEducador(@ActiveUser() user) {
    const paseos = await this.paseoService.getPaseosByEducador(+user.idPersona);
    const paseosDto = paseos.map((paseo) => {
      return {
        idPaseo: paseo.iden_paseo,
        paseo: paseo.desc_titulo,
        tipoPaseo: paseo.lda_tipo_paseo?.desc_tipo_paseo,
        fechaInicio: formatFecha2(paseo.fech_inicio.toISOString()),
        fechaFin: formatFecha2(paseo.fech_fin.toISOString()),
      };
    });

    paseosDto.sort((a, b) => {
      return (
        new Date(a.fechaInicio).getTime() - new Date(b.fechaInicio).getTime()
      );
    });
    return paseosDto;
  }

  @Get('getNivelesByPaseo/:idPaseo')
  @Auth(Rol.EDUCADOR)
  async getNivelesByPaseo(
    @ActiveUser() user,
    @Param('idPaseo') idPaseo: number,
  ) {
    const niveles = await this.paseoService.getNivelesByPaseo(
      +idPaseo,
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

  @Get('getMenoresByPaseoNivel/:idPaseo/:idNivel')
  @Auth(Rol.EDUCADOR)
  async getMenoresByPaseoNivel(
    @ActiveUser() user,
    @Param('idPaseo') idPaseo: number,
    @Param('idNivel') idNivel: number,
  ) {
    const menores = await this.paseoService.getMenoresByPaseoNivel(
      +idPaseo,
      +idNivel,
      +user.idPersona,
    );
    const menoresDto = menores.map((menor) => {
      const per = menor.lda_menor.per_persona;
      const perAp =
        menor.lda_menor.per_persona_lda_menor_iden_per_apoderadoToper_persona;
      return {
        idMenor: menor.iden_menor,
        nombre:
          per.apellidoM != null
            ? per.primerNombre + ' ' + per.apellidoP + ' ' + per.apellidoM
            : per.primerNombre + ' ' + per.apellidoP,
        nombreApoderado:
          perAp.apellidoM != null
            ? perAp.primerNombre + ' ' + perAp.apellidoP + ' ' + perAp.apellidoM
            : perAp.primerNombre + ' ' + perAp.apellidoP,
        autorizado: menor.flag_autorizado,
      };
    });

    return menoresDto;
  }

  @Get('getMenorByPaseoNivelMenor/:idPaseo/:idNivel/:idMenor')
  @Auth(Rol.EDUCADOR)
  async getMenorByPaseoNivelMenor(
    @ActiveUser() user,
    @Param('idPaseo') idPaseo: number,
    @Param('idNivel') idNivel: number,
    @Param('idMenor') idMenor: number,
  ) {
    const menor = await this.paseoService.getMenorByPaseoNivelMenor(
      +idPaseo,
      +idNivel,
      +idMenor,
      +user.idPersona,
    );
    const per = menor.per_persona;
    const perAp = menor.per_persona_lda_menor_iden_per_apoderadoToper_persona;
    const menoresDto = {
      nombreMenor:
        per.apellidoM != null
          ? per.primerNombre + ' ' + per.apellidoP + ' ' + per.apellidoM
          : per.primerNombre + ' ' + per.apellidoP,
      nombreApoderado:
        perAp.apellidoM != null
          ? perAp.primerNombre + ' ' + perAp.apellidoP + ' ' + perAp.apellidoM
          : perAp.primerNombre + ' ' + perAp.apellidoP,
      telApoderado: perAp.desc_tel,
      emailApoderado: perAp.desc_email,
      nivel: menor.lda_nivel_menor[0]?.lda_nivel?.desc_nombre,
      tipoPaseo:
        menor.lda_paseo_menor[0]?.lda_paseo?.lda_tipo_paseo?.desc_tipo_paseo,
      nombrePaseo: menor.lda_paseo_menor[0]?.lda_paseo?.desc_titulo,
      descPaseo: menor.lda_paseo_menor[0]?.lda_paseo?.desc_descripcion,
      fechaInicio: formatFecha2(
        menor.lda_paseo_menor[0]?.lda_paseo?.fech_inicio.toISOString(),
      ),
      fechaFin: formatFecha2(
        menor.lda_paseo_menor[0]?.lda_paseo?.fech_fin.toISOString(),
      ),
      autorizado: menor.lda_paseo_menor[0]?.flag_autorizado,
    };

    return menoresDto;
  }

  @Get('getTiposPaseo')
  @Auth([Rol.EDUCADOR, Rol.DIRECTOR])
  async getTiposPaseo() {
    const tiposPaseo = await this.paseoService.getTiposPaseo();
    const tiposPaseoDto = tiposPaseo.map((tipo) => {
      return {
        key: tipo.iden_tipo_paseo,
        text: tipo.desc_tipo_paseo,
      };
    });

    return tiposPaseoDto;
  }

  @Post('crearPaseo')
  @Auth(Rol.EDUCADOR)
  async crearPaseo(
    @ActiveUser() user,
    @Body()
    body: PaseoData | any,
  ) {
    return await this.paseoService.crearPaseo(body, user.idPersona);
  }
}
