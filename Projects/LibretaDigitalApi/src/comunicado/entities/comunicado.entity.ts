export class Comunicado {}

export class ComunicadoData {
  tipoComunicado: number;
  nivel: number;
  asunto: string;
  texto: string;
  enviarATodosMenores: boolean;
  menoresSeleccionados: number[];
  idArchivo: number | null;
}
