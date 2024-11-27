import { Controller, Get, Param } from '@nestjs/common';
import { VacunaService } from './vacuna.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Rol } from 'src/common/enums/rol.enum';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import formatFecha1 from 'src/common/functions/formatFecha1';

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
    console.log(menor);
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
}
