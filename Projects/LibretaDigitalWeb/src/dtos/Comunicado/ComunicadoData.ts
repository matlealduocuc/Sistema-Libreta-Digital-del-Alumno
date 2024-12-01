export class ComunicadoData {
  tipoComunicado: number;
  nivel: number;
  asunto: string;
  texto: string;
  enviarATodosMenores: boolean;
  menoresSeleccionados: number[];
  idArchivo: number | null;

  constructor(
    tipoComunicado: number,
    nivel: number,
    asunto: string,
    texto: string,
    enviarATodosMenores: boolean,
    menoresSeleccionados: number[],
    idArchivo: number | null
  ) {
    this.tipoComunicado = tipoComunicado;
    this.nivel = nivel;
    this.asunto = asunto;
    this.texto = texto;
    this.enviarATodosMenores = enviarATodosMenores;
    this.menoresSeleccionados = menoresSeleccionados;
    this.idArchivo = idArchivo;
  }
}
