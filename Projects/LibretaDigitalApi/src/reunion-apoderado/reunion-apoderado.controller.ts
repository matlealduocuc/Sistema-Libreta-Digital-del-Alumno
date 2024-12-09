import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ReunionApoderadoService } from './reunion-apoderado.service';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Rol } from 'src/common/enums/rol.enum';
import formatFecha2 from 'src/common/functions/formatFecha2';
import { ReunionApoderadoData } from './entities/reunion-apoderado.entity';

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

  @Get('getNivelesByReunion/:idReunion')
  @Auth(Rol.EDUCADOR)
  async getNivelesByReunion(
    @ActiveUser() user,
    @Param('idReunion') idReunion: string,
  ) {
    const niveles = await this.reunionApoderadoService.getNivelesByReunion(
      +idReunion,
      +user.idPersona,
    );
    const nivelesDto = niveles.map((nivel) => {
      return {
        idNivel: nivel.iden_nivel,
        descNombre: nivel.desc_nombre,
        cantidadMenores: nivel._count.lda_nivel_menor,
      };
    });

    return nivelesDto;
  }

  @Get('getMenoresByReunionNivel/:idReunion/:idNivel')
  @Auth(Rol.EDUCADOR)
  async getMenoresByReunionNivel(
    @ActiveUser() user,
    @Param('idReunion') idReunion: string,
    @Param('idNivel') idNivel: string,
  ) {
    const menores = await this.reunionApoderadoService.getMenoresByReunionNivel(
      +idReunion,
      +idNivel,
      +user.idPersona,
    );
    const menoresDto = menores.map((menor) => {
      const apoderado =
        menor.per_persona_lda_menor_iden_per_apoderadoToper_persona;
      return {
        idMenor: menor.id,
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
        nombreApoderado:
          apoderado.apellidoM != null
            ? apoderado.primerNombre +
              ' ' +
              apoderado.apellidoP +
              ' ' +
              apoderado.apellidoM
            : apoderado.primerNombre + ' ' + apoderado.apellidoP,
        confirmado: menor.lda_reunion_menor[0].flag_confirmado,
      };
    });

    return menoresDto;
  }

  @Get('getMenorByReunionNivelMenor/:idReunion/:idNivel/:idMenor')
  @Auth(Rol.EDUCADOR)
  async getMenorByReunionNivelMenor(
    @ActiveUser() user,
    @Param('idReunion') idReunion: string,
    @Param('idNivel') idNivel: string,
    @Param('idMenor') idMenor: string,
  ) {
    const reunion =
      await this.reunionApoderadoService.getMenorByReunionNivelMenor(
        +idReunion,
        +idNivel,
        +idMenor,
        +user.idPersona,
      );
    const menor = reunion.per_persona;
    const apoderado =
      reunion.per_persona_lda_menor_iden_per_apoderadoToper_persona;
    const reunionDto = {
      nombreMenor:
        menor.apellidoM != null
          ? menor.primerNombre + ' ' + menor.apellidoP + ' ' + menor.apellidoM
          : menor.primerNombre + ' ' + menor.apellidoP,
      nombreApoderado:
        apoderado.apellidoM != null
          ? apoderado.primerNombre +
            ' ' +
            apoderado.apellidoP +
            ' ' +
            apoderado.apellidoM
          : apoderado.primerNombre + ' ' + apoderado.apellidoP,
      telApoderado: apoderado.desc_tel,
      emailApoderado: apoderado.desc_email,
      nivel: reunion.lda_nivel_menor[0]?.lda_nivel?.desc_nombre,
      tituloReunion: reunion.lda_reunion_menor[0]?.lda_reunion?.desc_titulo,
      temasTratar:
        reunion.lda_reunion_menor[0]?.lda_reunion?.lda_reunion_tema.map(
          (tema) => tema.desc_tema,
        ),
      fechaReunion: formatFecha2(
        reunion.lda_reunion_menor[0]?.lda_reunion?.fech_reunion.toISOString(),
      ),
      sala: reunion.lda_reunion_menor[0]?.lda_reunion?.lda_sala?.desc_nombre,
      confirmado: reunion.lda_reunion_menor[0]?.flag_confirmado ?? null,
    };
    return reunionDto;
  }

  @Post('crearReunion')
  @Auth(Rol.EDUCADOR)
  async crearReunion(
    @ActiveUser() user,
    @Body()
    body: ReunionApoderadoData | any,
  ) {
    return await this.reunionApoderadoService.crearReunion(
      body,
      user.idPersona,
    );
  }
}
