import { Controller, Get, Param } from '@nestjs/common';
import { NivelService } from './nivel.service';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Rol } from 'src/common/enums/rol.enum';

@Controller('nivel')
export class NivelController {
  constructor(private readonly nivelService: NivelService) {}

  @Get('getNivelesWhereSomeVacuna')
  @Auth(Rol.EDUCADOR)
  async getNivelesWhereSomeVacuna(@ActiveUser() user) {
    const niveles = await this.nivelService.getNivelesWhereSomeVacuna(
      +user.idPersona,
    );
    const nivelesDto = niveles.map((nivel) => {
      return {
        idenNivel: nivel.iden_nivel,
        descNombre: nivel.desc_nombre,
        cantidadMenores: nivel._count.lda_nivel_menor,
      };
    });
    return nivelesDto;
  }

  @Get('getMenoresByNivel/:idNivel')
  @Auth(Rol.EDUCADOR)
  async getMenoresByNivel(
    @ActiveUser() user,
    @Param('idNivel') idNivel: number,
  ) {
    const menores = await this.nivelService.getMenoresByNivel(
      +user.idPersona,
      +idNivel,
    );
    const menoresDto = menores.map((menor) => {
      return {
        idenMenor: menor.id,
        descNombre:
          menor.per_persona.apellidoM != null
            ? menor.per_persona.primerNombre +
              ' ' +
              menor.per_persona.apellidoP +
              ' ' +
              menor.per_persona.apellidoM
            : menor.per_persona.primerNombre +
              ' ' +
              menor.per_persona.apellidoP,
        autorizado: menor.lda_vacuna_menor[0]?.flag_autorizado,
      };
    });
    return menoresDto;
  }

  @Get('getNivelesByEducador')
  @Auth(Rol.EDUCADOR)
  async getNivelesByEducador(@ActiveUser() user) {
    const niveles = await this.nivelService.getNivelesByEducador(
      +user.idPersona,
    );
    const nivelesDto = niveles.map((nivel) => {
      return {
        key: nivel.iden_nivel,
        text: nivel.desc_nombre,
      };
    });
    return nivelesDto;
  }

  @Get('getAllNiveles')
  @Auth(Rol.DIRECTOR)
  async getAllNiveles() {
    const niveles = await this.nivelService.getAllNiveles();
    const nivelesDto = niveles.map((nivel) => {
      return {
        key: nivel.iden_nivel,
        text: nivel.desc_nombre,
      };
    });
    return nivelesDto;
  }
}
