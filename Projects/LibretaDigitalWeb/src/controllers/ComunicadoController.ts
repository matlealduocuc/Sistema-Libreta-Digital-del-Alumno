import { ComunicadoService } from "@/services/ComunicadoService";

export class ComunicadoController {
  private _comunicadoService: ComunicadoService;
  constructor() {
    this._comunicadoService = new ComunicadoService();
  }

  async getComunicadosByGrado(idGrado: number) {
    const perfil = await this._comunicadoService.getComunicadosByGrado(idGrado);
    return perfil;
  }

  async getTiposComunicado() {
    return await this._comunicadoService.getTiposComunicado();
  }

  async getComunicadosByMenor(idMenor: number) {
    return await this._comunicadoService.getComunicadosByMenor(idMenor);
  }

  async getComunicadoByMenorComunicado(idMenor: number, idComunicado: number) {
    return await this._comunicadoService.getComunicadoByMenorComunicado(
      idMenor,
      idComunicado
    );
  }

  async confirmaConocimientoComunicadoMenor(
    idMenor: number,
    idComunicado: number
  ) {
    return await this._comunicadoService.confirmaConocimientoComunicadoMenor(
      idMenor,
      idComunicado
    );
  }

  async getNivelesByEducador() {
    return await this._comunicadoService.getNivelesByEducador();
  }

  async enviarComunicado(
    req: Request & {
      body: {
        tipoComunicado: string;
        nivel: string;
        textoComunicado: string;
        enviarATodosMenores: string;
        menoresSeleccionados: string;
      };
      file?: File;
    }
  ) {
    const {
      tipoComunicado,
      nivel,
      textoComunicado,
      enviarATodosMenores,
      menoresSeleccionados,
    } = req.body;
    const archivoPDF = req.file;

    return await this._comunicadoService.subirComunicado({
      tipoComunicado,
      nivel,
      textoComunicado,
      enviarATodosMenores: enviarATodosMenores === "true",
      menoresSeleccionados: JSON.parse(menoresSeleccionados),
      archivoPDF,
    });
  }
}
