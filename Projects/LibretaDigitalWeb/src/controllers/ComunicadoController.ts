import { ComunicadoService } from "@/services/ComunicadoService";

export class ComunicadoController {
  private _comunicadoService: ComunicadoService;
  constructor() {
    this._comunicadoService = new ComunicadoService();
  }

  async getComunicadosByGrado(idGrado: number) {
    const perfil = await this._comunicadoService.getComunicadosByGrado(idGrado);
    console.log(perfil);
    return perfil;
  }

  async getTiposComunicado() {
    const tiposComunicado = await this._comunicadoService.getTiposComunicado();
    console.log(tiposComunicado);
    return tiposComunicado;
  }
}
