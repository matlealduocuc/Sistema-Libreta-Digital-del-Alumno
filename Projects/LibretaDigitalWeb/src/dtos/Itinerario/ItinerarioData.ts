export class ItinerarioData {
  titulo: string;
  descripcion: string;
  fechaActividad: Date;
  actividadRealizada: boolean;
  enviarATodosNiveles: boolean;
  nivelesSeleccionados: number[];

  constructor(
    titulo: string,
    descripcion: string,
    fechaActividad: Date,
    actividadRealizada: boolean,
    enviarATodosNiveles: boolean,
    nivelesSeleccionados: number[]
  ) {
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.fechaActividad = fechaActividad;
    this.actividadRealizada = actividadRealizada;
    this.enviarATodosNiveles = enviarATodosNiveles;
    this.nivelesSeleccionados = nivelesSeleccionados;
  }
}
