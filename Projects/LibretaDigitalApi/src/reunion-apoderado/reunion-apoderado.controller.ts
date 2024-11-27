import { Controller, Get } from '@nestjs/common';
import { ReunionApoderadoService } from './reunion-apoderado.service';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Rol } from 'src/common/enums/rol.enum';
import formatFecha2 from 'src/common/functions/formatFecha2';

@Controller('reunion-apoderado')
export class ReunionApoderadoController {
  constructor(
    private readonly reunionApoderadoService: ReunionApoderadoService,
  ) {}

  @Get('getReunionesByEducador')
  @Auth(Rol.EDUCADOR)
  async getReunionesByEducador(@ActiveUser() user) {
    const reuniones = await this.reunionApoderadoService.getReunionesByEducador(
      +user.idPersona,
    );
    const reunionesDto = reuniones.map((reunion) => {
      return {
        idReunion: reunion.iden_reunion,
        reunion: reunion.desc_titulo,
        sala: reunion.lda_sala.desc_nombre,
        fechaReunion: formatFecha2(reunion.fech_reunion.toISOString()),
      };
    });

    reunionesDto.sort((a, b) => {
      return (
        new Date(a.fechaReunion).getTime() - new Date(b.fechaReunion).getTime()
      );
    });
    return reunionesDto;
  }
}
