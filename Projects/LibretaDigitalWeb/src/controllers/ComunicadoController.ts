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
}
