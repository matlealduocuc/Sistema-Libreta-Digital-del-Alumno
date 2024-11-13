import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginRutDto } from './dto/login-rut.dto';
import { UsuarioService } from 'src/usuario/usuario.service';
import { JwtService } from '@nestjs/jwt';
import { AuthorizedUserDto } from './dto/authorized-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginRutDto: LoginRutDto) {
    const usuario = await this.usuarioService.findByRun(loginRutDto.run);
    if (!usuario || usuario.password !== loginRutDto.password)
      throw new UnauthorizedException('RUT o Contraseña incorrecta');
    if (usuario.activo === false)
      throw new UnauthorizedException('El usuario está desactivado');
    if (usuario.persona.flag_eliminado === true)
      throw new UnauthorizedException('La persona no existe');
    if (usuario.persona.flag_activo === false)
      throw new UnauthorizedException('La persona está desactivada');

    const persona = usuario.persona;
    const tipoIdentificacion = persona.TipoIdentificador;
    const sexo = persona.per_sexo;
    const rolUsuario = usuario.usr_rol;

    const personAuthDto = {
      idPersona: persona.id,
      primerNombre: persona.primerNombre,
      segundoNombre: persona.segundoNombre,
      apellidoP: persona.apellidoP,
      apellidoM: persona.apellidoM,
      run: persona.run,
      dv: persona.char_dv,
      dni: persona.desc_dni,
      tipoIdentificacion: tipoIdentificacion.tipo,
      sexo: sexo.code_sexo,
    };

    const payload: any = {
      rol: rolUsuario.desc_rol,
      idUsuario: usuario.id,
      idPersona: persona.id,
    };

    // if (tipoIdentificacion.tipo === 'RUN')
    //   payload.rut = persona.run + '-' + persona.char_dv;

    // if (tipoIdentificacion.tipo === 'DNI') payload.dni = persona.desc_dni;

    const token = this.jwtService.sign(payload);

    return new AuthorizedUserDto(
      token,
      personAuthDto,
      usuario.id,
      rolUsuario.desc_rol,
    );
  }
}
