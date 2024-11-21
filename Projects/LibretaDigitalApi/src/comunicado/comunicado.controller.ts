import { Controller, Get } from '@nestjs/common';
import { ComunicadoService } from './comunicado.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Rol } from 'src/common/enums/rol.enum';

@Controller('comunicado')
export class ComunicadoController {
  constructor(private readonly comunicadoService: ComunicadoService) {}

  @Get('getTipos')
  @Auth([Rol.EDUCADOR, Rol.ADMIN, Rol.DIRECTOR])
  async getGradosByEducadorIdPersona() {
    return await this.comunicadoService.getTiposComunicado();
  }
}
