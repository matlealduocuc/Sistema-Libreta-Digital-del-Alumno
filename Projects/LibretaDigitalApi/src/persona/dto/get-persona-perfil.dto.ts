export class GetPersonaPerfil {
  run: string | null;
  dv: string | null;
  primerNombre: string;
  segundoNombre: string | null;
  apellidoP: string;
  apellidoM: string | null;
  email: string | null;
  telefono: string | null;
  direccion: string | null;

  constructor(
    run: string | null,
    dv: string | null,
    primerNombre: string,
    segundoNombre: string | null,
    apellidoP: string,
    apellidoM: string | null,
    email: string | null,
    telefono: string | null,
    direccion: string | null,
  ) {
    this.run = run;
    this.dv = dv;
    this.primerNombre = primerNombre;
    this.segundoNombre = segundoNombre;
    this.apellidoP = apellidoP;
    this.apellidoM = apellidoM;
    this.email = email;
    this.telefono = telefono;
    this.direccion = direccion;
  }
}
