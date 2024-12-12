import { Controller, Get } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Rol } from 'src/common/enums/rol.enum';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Get('getAllApoderados')
  @Auth(Rol.DIRECTOR)
  async getAllApoderados() {
    const apoderados = await this.usuarioService.getAllApoderados();
    const apoderadosDto = apoderados.map((apoderado) => {
      const per = apoderado.persona;
      return {
        idApoderado: per.id,
        nombre:
          per.apellidoM != null
            ? per.primerNombre + ' ' + per.apellidoP + ' ' + per.apellidoM
            : per.primerNombre + ' ' + per.apellidoP,
        menoresACargo:
          per._count.lda_menor_lda_menor_iden_per_apoderadoToper_persona,
      };
    });

    return apoderadosDto;
  }
}
