import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { VacunaService } from './vacuna.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Rol } from 'src/common/enums/rol.enum';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import formatFecha1 from 'src/common/functions/formatFecha1';
import formatFecha2 from 'src/common/functions/formatFecha2';

@Controller('vacuna')
export class VacunaController {
  constructor(private readonly vacunaService: VacunaService) {}

  @Get('getMenorByNivelMenor/:idNivel/:idMenor')
  @Auth(Rol.EDUCADOR)
  async getMenorByNivelMenor(
    @ActiveUser() user,
    @Param('idNivel') idNivel: number,
    @Param('idMenor') idMenor: number,
  ) {
    const menor = await this.vacunaService.getMenorByNivelMenor(
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
      nombreVacuna: menor.lda_vacuna_menor[0]?.lda_vacuna?.desc_nombre,
      fechaVacuna: formatFecha1(
        menor.lda_vacuna_menor[0]?.lda_vacuna?.fech_vacunacion.toISOString(),
      ),
      autorizado: menor.lda_vacuna_menor[0]?.flag_autorizado,
    };

    return menoresDto;
  }

  @Get('getNivelesAvisarVacunaByEducador')
  @Auth(Rol.EDUCADOR)
  async getNivelesAvisarVacunaByEducador(@ActiveUser() user) {
    const niveles = await this.vacunaService.getNivelesAvisarVacunaByEducador(
      +user.idPersona,
    );
    const nivelesDto = niveles.map((nivel) => {
      const fechaVacuna =
        nivel.lda_nivel_menor[0]?.lda_menor.lda_vacuna_menor[0]?.lda_vacuna
          .fech_vacunacion;
      const solilcitado =
        nivel.lda_nivel_menor[0]?.lda_menor.lda_vacuna_menor != null &&
        nivel.lda_nivel_menor[0]?.lda_menor.lda_vacuna_menor.filter(
          (vacMenor) => vacMenor != null || vacMenor.lda_vacuna != null,
        ).length != 0;
      return {
        id: nivel.iden_nivel,
        nivel: nivel.desc_nombre,
        nmroSolicitados: nivel.lda_nivel_menor.reduce((count, nivMenor) => {
          return (
            count +
            nivMenor.lda_menor.lda_vacuna_menor.filter(
              (vacMenor) => vacMenor.flag_autorizado != null,
            ).length
          );
        }, 0),
        nmroNoSolicitados:
          solilcitado == false
            ? nivel._count.lda_nivel_menor
            : nivel.lda_nivel_menor.reduce((count, nivMenor) => {
                const vacunaMenor = nivMenor.lda_menor.lda_vacuna_menor;
                return (
                  count +
                  (vacunaMenor.length > 0
                    ? vacunaMenor.filter(
                        (vacMenor) => vacMenor.flag_autorizado === null,
                      ).length
                    : 1)
                );
              }, 0),
        fechaVacuna:
          fechaVacuna != null ? formatFecha2(fechaVacuna.toISOString()) : null,
        solicitado: solilcitado,
      };
    });

    return nivelesDto;
  }

  @Get('getNivelVacunaByNivel/:idNivel')
  @Auth(Rol.EDUCADOR)
  async getNivelVacunaByNivel(
    @ActiveUser() user,
    @Param('idNivel') idNivel: number,
  ) {
    const nivel = await this.vacunaService.getNivelVacunaByNivel(
      +idNivel,
      +user.idPersona,
    );
    const fechaVacuna =
      nivel.lda_nivel_menor[0]?.lda_menor.lda_vacuna_menor[0]?.lda_vacuna
        .fech_vacunacion;
    const solilcitado =
      nivel.lda_nivel_menor[0]?.lda_menor.lda_vacuna_menor != null &&
      nivel.lda_nivel_menor[0]?.lda_menor.lda_vacuna_menor.filter(
        (vacMenor) => vacMenor != null || vacMenor.lda_vacuna != null,
      ).length != 0;
    const nivelDto = {
      idVacuna:
        nivel.lda_nivel_menor[0]?.lda_menor.lda_vacuna_menor[0]?.lda_vacuna
          .iden_vacuna,
      nivel: nivel.desc_nombre,
      nombreVacuna:
        nivel.lda_nivel_menor[0]?.lda_menor.lda_vacuna_menor[0]?.lda_vacuna
          .desc_nombre,
      nmroMenores: nivel._count.lda_nivel_menor,
      nmroSolicitados: nivel.lda_nivel_menor.reduce((count, nivMenor) => {
        return (
          count +
          nivMenor.lda_menor.lda_vacuna_menor.filter(
            (vacMenor) => vacMenor.flag_autorizado != null,
          ).length
        );
      }, 0),
      nmroNoSolicitados:
        solilcitado == false
          ? nivel._count.lda_nivel_menor
          : nivel.lda_nivel_menor.reduce((count, nivMenor) => {
              const vacunaMenor = nivMenor.lda_menor.lda_vacuna_menor;
              return (
                count +
                (vacunaMenor.length > 0
                  ? vacunaMenor.filter(
                      (vacMenor) => vacMenor.flag_autorizado === null,
                    ).length
                  : 1)
              );
            }, 0),
      fechaVacuna:
        fechaVacuna != null ? formatFecha2(fechaVacuna.toISOString()) : null,
      solicitado: solilcitado,
    };

    return nivelDto;
  }

  @Post('solicitarVacunaNivel/:idNivel')
  @Auth(Rol.EDUCADOR)
  async solicitarVacunaNivel(
    @ActiveUser() user,
    @Param('idNivel') idNivel: number,
    @Body()
    body: {
      nombVacuna: number;
      fechVacuna: Date;
    },
  ) {
    const { nombVacuna, fechVacuna } = body;
    const nivel = await this.vacunaService.solicitarVacunaNivel(
      nombVacuna,
      fechVacuna,
      +idNivel,
      +user.idPersona,
    );
    const fechaVacuna =
      nivel.lda_nivel_menor[0]?.lda_menor.lda_vacuna_menor[0]?.lda_vacuna
        .fech_vacunacion;
    const solilcitado =
      nivel.lda_nivel_menor[0]?.lda_menor.lda_vacuna_menor != null &&
      nivel.lda_nivel_menor[0]?.lda_menor.lda_vacuna_menor.filter(
        (vacMenor) => vacMenor != null || vacMenor.lda_vacuna != null,
      ).length != 0;
    const nivelDto = {
      idVacuna:
        nivel.lda_nivel_menor[0]?.lda_menor.lda_vacuna_menor[0]?.lda_vacuna
          .iden_vacuna,
      nivel: nivel.desc_nombre,
      nombreVacuna:
        nivel.lda_nivel_menor[0]?.lda_menor.lda_vacuna_menor[0]?.lda_vacuna
          .desc_nombre,
      nmroMenores: nivel._count.lda_nivel_menor,
      nmroSolicitados: nivel.lda_nivel_menor.reduce((count, nivMenor) => {
        return (
          count +
          nivMenor.lda_menor.lda_vacuna_menor.filter(
            (vacMenor) => vacMenor.flag_autorizado != null,
          ).length
        );
      }, 0),
      nmroNoSolicitados:
        solilcitado == false
          ? nivel._count.lda_nivel_menor
          : nivel.lda_nivel_menor.reduce((count, nivMenor) => {
              const vacunaMenor = nivMenor.lda_menor.lda_vacuna_menor;
              return (
                count +
                (vacunaMenor.length > 0
                  ? vacunaMenor.filter(
                      (vacMenor) => vacMenor.flag_autorizado === null,
                    ).length
                  : 1)
              );
            }, 0),
      fechaVacuna:
        fechaVacuna != null ? formatFecha2(fechaVacuna.toISOString()) : null,
      solicitado: solilcitado,
    };

    return nivelDto;
  }
}
