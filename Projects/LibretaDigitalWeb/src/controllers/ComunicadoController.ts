import {
  ComunicadoData,
  ComunicadoDataEducador,
} from "@/dtos/Comunicado/ComunicadoData";
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

  async enviarComunicado(comunicado: ComunicadoData) {
    return await this._comunicadoService.subirComunicado(comunicado);
  }

  async enviarComunicadoDirector(comunicado: ComunicadoDataEducador) {
    return await this._comunicadoService.subirComunicadoDirector(comunicado);
  }

  async getComunicadosByNivel(nivel: number) {
    return await this._comunicadoService.getComunicadosByNivel(nivel);
  }

  async setActivacionComunicado(idComunicado: number, estado: boolean) {
    return await this._comunicadoService.setActivacionComunicado(
      idComunicado,
      estado
    );
  }

  async deleteComunicado(idComunicado: number) {
    return await this._comunicadoService.deleteComunicado(idComunicado);
  }
}
