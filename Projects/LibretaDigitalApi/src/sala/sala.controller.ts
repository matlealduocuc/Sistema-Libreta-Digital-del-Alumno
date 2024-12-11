import { Controller, Get } from '@nestjs/common';
import { SalaService } from './sala.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Rol } from 'src/common/enums/rol.enum';

@Controller('sala')
export class SalaController {
  constructor(private readonly salaService: SalaService) {}

  @Get('getSalas')
  @Auth([Rol.EDUCADOR, Rol.DIRECTOR])
  async getSalas() {
    const salas = await this.salaService.getSalas();
    const salasDto = salas.map((sala) => {
      return {
        key: sala.iden_sala,
        text: sala.desc_nombre,
      };
    });
    return salasDto;
  }
}
