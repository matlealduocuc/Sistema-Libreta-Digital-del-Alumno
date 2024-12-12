export class NewApoderadoData {
  nombre: string;
  apellidoP: string;
  apellidoM: string;
  fechNac: Date;
  sexo: number;
  rut: string;
  password: string;

  constructor(
    nombre: string,
    apellidoP: string,
    apellidoM: string,
    fechNac: Date,
    sexo: number,
    rut: string,
    password: string
  ) {
    this.nombre = nombre;
    this.apellidoP = apellidoP;
    this.apellidoM = apellidoM;
    this.fechNac = fechNac;
    this.sexo = sexo;
    this.rut = rut;
    this.password = password;
  }
}
