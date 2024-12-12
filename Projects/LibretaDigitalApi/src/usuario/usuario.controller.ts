import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Rol } from 'src/common/enums/rol.enum';
import { NewApoderadoData } from './dto/create-usuario.dto';

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
        rut: per.run + '-' + per.char_dv,
        email: per.desc_email,
        telefono: per.desc_tel,
        direccion: per.desc_direccion,
        menoresACargo:
          per._count.lda_menor_lda_menor_iden_per_apoderadoToper_persona,
        menores: per.lda_menor_lda_menor_iden_per_apoderadoToper_persona.map(
          (menor) => ({
            nombre:
              menor.per_persona.apellidoM != null
                ? menor.per_persona.primerNombre +
                  ' ' +
                  menor.per_persona.apellidoP +
                  ' ' +
                  menor.per_persona.apellidoM
                : menor.per_persona.primerNombre +
                  ' ' +
                  menor.per_persona.apellidoP,
            nivel: menor.lda_nivel_menor[0]?.lda_nivel.desc_nombre,
            jornada: menor.lda_jornada.desc_nombre,
          }),
        ),
        activo: per.flag_activo,
      };
    });
    return apoderadosDto;
  }

  @Post('setActivacionApoderado/:idApoderado/:estado')
  @Auth(Rol.DIRECTOR)
  async setActivacionApoderado(
    @Param('idApoderado') idApoderado: number,
    @Param('estado') estado: string,
  ) {
    return await this.usuarioService.setActivacionApoderado(
      +idApoderado,
      estado == 'true' ? true : false,
    );
  }

  @Post('deleteApoderado/:idApoderado')
  @Auth(Rol.DIRECTOR)
  async deleteApoderado(@Param('idApoderado') idApoderado: number) {
    return await this.usuarioService.deleteApoderado(+idApoderado);
  }

  @Get('getSexos')
  @Auth(Rol.DIRECTOR)
  async getSexos() {
    const sexos = await this.usuarioService.getSexos();
    const sexosDto = sexos.map((sexo) => {
      return {
        key: sexo.iden_sexo,
        text: sexo.desc_nombre,
      };
    });

    return sexosDto;
  }

  @Post('crearNuevoApoderado')
  @Auth(Rol.DIRECTOR)
  async crearNuevoApoderado(
    @Body()
    body: NewApoderadoData | any,
  ) {
    return await this.usuarioService.crearNuevoApoderado(body);
  }
}
