import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { PersonaService } from './persona.service';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import RequestWithUser from 'src/auth/interfaces/req-user.interface';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Rol } from 'src/common/enums/rol.enum';
import { Auth } from 'src/auth/decorators/auth.decorator';
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

  // @Get(':id')
  // @Roles([Rol.ADMIN, Rol.USER])
  // @UseGuards(AuthGuard, RolesGuard)
  // findOneById(@Req() req: RequestWithUser, @Param('id') id: string) {
  //   console.log(req.user);
  //   return this.personaService.findOneById(+id);
  // }

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

  @Patch('actualizar/:id')
  async actualizar(
    @Param('id') id: number,
    @Body() updatePersonaDto: UpdatePersonaDto,
  ) {
    console.log(updatePersonaDto);
    const personaActualizada = await this.personaService.actualizar(
      id,
      updatePersonaDto,
    );
    console.log(personaActualizada);
    return personaActualizada;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personaService.remove(+id);
  }
}
