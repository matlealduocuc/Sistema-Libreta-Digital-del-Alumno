import { Controller, Get } from '@nestjs/common';
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
}
