export class ReunionData {
  titulo: string;
  temas: string[];
  salaReunion: number;
  fechaReunion: Date;
  enviarATodosNiveles: boolean;
  nivelesSeleccionados: number[];

  constructor(
    titulo: string,
    temas: string[],
    salaReunion: number,
    fechaReunion: Date,
    enviarATodosNiveles: boolean,
    nivelesSeleccionados: number[]
  ) {
    this.titulo = titulo;
    this.temas = temas;
    this.salaReunion = salaReunion;
    this.fechaReunion = fechaReunion;
    this.enviarATodosNiveles = enviarATodosNiveles;
    this.nivelesSeleccionados = nivelesSeleccionados;
  }
}
