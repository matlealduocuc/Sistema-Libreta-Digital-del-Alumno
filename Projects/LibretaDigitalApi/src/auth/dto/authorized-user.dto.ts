class PersonAuthDto {
  idPersona: number;
  primerNombre: string;
  segundoNombre: string | null;
  apellidoP: string;
  apellidoM: string | null;
  run: string | null;
  dv: string | null;
  dni: string | null;
  tipoIdentificacion: string;
  sexo: string | null;

  constructor(
    idPersona: number,
    primerNombre: string,
    segundoNombre: string | null,
    apellidoP: string,
    apellidoM: string | null,
    run: string | null,
    dv: string | null,
    dni: string | null,
    tipoIdentificacion: string,
    sexo: string,
  ) {
    this.idPersona = idPersona;
    this.primerNombre = primerNombre;
    this.segundoNombre = segundoNombre;
    this.apellidoP = apellidoP;
    this.apellidoM = apellidoM;
    this.run = run;
    this.dv = dv;
    this.dni = dni;
    this.tipoIdentificacion = tipoIdentificacion;
    this.sexo = sexo;
  }
}

export class AuthorizedUserDto {
  token: string;
  persona: PersonAuthDto;
  idUsuario: number;
  roles: string[];

  constructor(
    token: string,
    persona: PersonAuthDto,
    idUsuario: number,
    roles: string[],
  ) {
    this.token = token;
    this.persona = persona;
    this.idUsuario = idUsuario;
    this.roles = roles;
  }
}
