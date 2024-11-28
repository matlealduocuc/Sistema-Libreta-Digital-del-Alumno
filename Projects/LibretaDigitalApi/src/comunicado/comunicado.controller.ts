import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ComunicadoService } from './comunicado.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Rol } from 'src/common/enums/rol.enum';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import formatFecha2 from 'src/common/functions/formatFecha2';

@Controller('comunicado')
export class ComunicadoController {
  constructor(private readonly comunicadoService: ComunicadoService) {}

  @Get('getTiposComunicado')
  @Auth(Rol.EDUCADOR)
  async getTiposComunicado() {
    const tipos = await this.comunicadoService.getTiposComunicado();
    const tiposDto = tipos.map((tipo) => {
      return {
        key: tipo.iden_tipo_comunicado,
        text: tipo.desc_nombre,
      };
    });

    return tiposDto;
  }

  @Get('getComunicadosByMenor/:idMenor')
  @Auth(Rol.APODERADO)
  async getComunicadosByMenor(@ActiveUser() user, @Param('idMenor') idMenor) {
    const comunicados = await this.comunicadoService.getComunicadosByMenor(
      +idMenor,
      +user.idPersona,
    );
    const comunicadosDto = comunicados.map((comunicado) => {
      const usr = comunicado.lda_comunicado.usr_usuario;
      const rol = usr.usr_rol.desc_rol;
      return {
        idComunicado: comunicado.lda_comunicado.iden_comunicado,
        de:
          usr.persona.apellidoM != null
            ? usr.persona.primerNombre +
              ' ' +
              usr.persona.apellidoP +
              ' ' +
              usr.persona.apellidoM
            : usr.persona.primerNombre + ' ' + usr.persona.apellidoP,
        rol: rol.substring(0, 1).toUpperCase() + rol.substring(1).toLowerCase(),
        nivel: comunicado.lda_nivel.desc_nombre,
        titulo: comunicado.lda_comunicado.desc_titulo,
        fechaComunicado: formatFecha2(
          comunicado.lda_comunicado.fech_creacion.toISOString(),
        ),
        confirmado: comunicado.flag_confirmado,
      };
    });

    comunicadosDto.sort((a, b) => {
      if (a.confirmado === b.confirmado) {
        return (
          new Date(a.fechaComunicado).getTime() -
          new Date(b.fechaComunicado).getTime()
        );
      }
      if (a.confirmado === false) return -1;
      if (b.confirmado === false) return 1;
      if (a.confirmado === true) return -1;
      if (b.confirmado === true) return 1;
      return 0;
    });
    return comunicadosDto;
  }

  @Get('getComunicadoByMenorComunicado/:idMenor/:idComunicado')
  @Auth(Rol.APODERADO)
  async getComunicadoByMenorComunicado(
    @ActiveUser() user,
    @Param('idMenor') idMenor: string,
    @Param('idComunicado') idComunicado: string,
  ) {
    const comunicado =
      await this.comunicadoService.getComunicadoByMenorComunicado(
        +idMenor,
        +idComunicado,
        +user.idPersona,
      );
    const rol = comunicado.usr_usuario.usr_rol.desc_rol;
    const de = comunicado.usr_usuario.persona;
    const comunicadoDto = {
      de:
        de.apellidoM != null
          ? de.primerNombre + ' ' + de.apellidoP + ' ' + de.apellidoM
          : de.primerNombre + ' ' + de.apellidoP,

      rol: rol.substring(0, 1).toUpperCase() + rol.substring(1).toLowerCase(),
      nivel: comunicado.lda_comunicado_menor[0].lda_nivel.desc_nombre,
      titulo: comunicado.desc_titulo,
      fechaComunicado: formatFecha2(comunicado.fech_creacion.toISOString()),
      confirmado: comunicado.lda_comunicado_menor[0].flag_confirmado,
      detalle: comunicado.desc_texto,
    };
    return comunicadoDto;
  }

  @Post('confirmaConocimientoComunicadoMenor')
  @Auth(Rol.APODERADO)
  async confirmaConocimientoComunicadoMenor(
    @ActiveUser() user,
    @Body()
    body: {
      idMenor: number;
      idComunicado: number;
    },
  ) {
    const { idMenor, idComunicado } = body;
    return await this.comunicadoService.confirmaConocimientoComunicadoMenor(
      idMenor,
      idComunicado,
      +user.idPersona,
    );
  }

  @Get('getNivelesByEducador')
  @Auth(Rol.EDUCADOR)
  async getMenoresByApoderado(@ActiveUser() user) {
    const niveles = await this.comunicadoService.getNivelesByEducador(
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
}
