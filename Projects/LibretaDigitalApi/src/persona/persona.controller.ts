import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PersonaService } from './persona.service';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { GetPersonaPerfil } from './dto/get-persona-perfil.dto';

@Controller('persona')
export class PersonaController {
  constructor(private readonly personaService: PersonaService) {}

  @Post()
  create(@Body() createPersonaDto: CreatePersonaDto) {
    return this.personaService.create(createPersonaDto);
  }

  @Get()
  findAll() {
    return this.personaService.findAll();
  }

  @Get('obtener/:id')
  @UseGuards(AuthGuard)
  async findOneById(@ActiveUser() user, @Param('id') id: number) {
    const persona = await this.personaService.findOneById(id);
    const personaDto = new GetPersonaPerfil(
      persona.run,
      persona.char_dv,
      persona.primerNombre,
      persona.segundoNombre,
      persona.apellidoP,
      persona.apellidoM,
      persona.desc_email,
      persona.desc_tel,
      persona.desc_direccion,
    );
    return personaDto;
  }

  @Post('actualizar')
  @UseGuards(AuthGuard)
  async actualizar(
    @Body()
    updatedData: any,
  ) {
    console.log('Received updatedData:', updatedData);
    const personaActualizada =
      await this.personaService.actualizar(updatedData);
    console.log('Updated persona:', personaActualizada);
    return personaActualizada;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personaService.remove(+id);
  }
}
