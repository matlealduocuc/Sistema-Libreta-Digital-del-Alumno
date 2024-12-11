export class PaseoData {
  titulo: string;
  descripcion: string;
  tipoPaseo: number;
  fechaInicio: Date;
  fechaTermino: Date;
  enviarATodosNiveles: boolean;
  nivelesSeleccionados: number[];

  constructor(
    titulo: string,
    descripcion: string,
    tipoPaseo: number,
    fechaInicio: Date,
    fechaTermino: Date,
    enviarATodosNiveles: boolean,
    nivelesSeleccionados: number[]
  ) {
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.tipoPaseo = tipoPaseo;
    this.fechaInicio = fechaInicio;
    this.fechaTermino = fechaTermino;
    this.enviarATodosNiveles = enviarATodosNiveles;
    this.nivelesSeleccionados = nivelesSeleccionados;
  }
}
