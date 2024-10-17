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

  @Get(':id')
  @Auth(Rol.ADMIN)
  findOneById(@ActiveUser() user, @Param('id') id: string) {
    console.log(user);
    return this.personaService.findOneById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePersonaDto: UpdatePersonaDto) {
    return this.personaService.update(+id, updatePersonaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personaService.remove(+id);
  }
}
