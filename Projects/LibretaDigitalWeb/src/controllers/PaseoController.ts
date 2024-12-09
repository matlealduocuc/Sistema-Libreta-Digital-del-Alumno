import { PaseoData } from "@/dtos/Paseo/PaseoData";
import { PaseoService } from "@/services/PaseoService";

export class PaseoController {
  private _paseoService: PaseoService;
  constructor() {
    this._paseoService = new PaseoService();
  }

  async getPaseosByEducador() {
    return await this._paseoService.getPaseosByEducador();
  }

  async getNivelesByPaseo(idPaseo: number) {
    return await this._paseoService.getNivelesByPaseo(idPaseo);
  }

  async getMenoresByPaseoNivel(idPaseo: number, idNivel: number) {
    return await this._paseoService.getMenoresByPaseoNivel(idPaseo, idNivel);
  }

  async getMenorByPaseoNivelMenor(
    idPaseo: number,
    idNivel: number,
    idMenor: number
  ) {
    return await this._paseoService.getMenorByPaseoNivelMenor(
      idPaseo,
      idNivel,
      idMenor
    );
  }

  async getTiposPaseo() {
    return await this._paseoService.getTiposPaseo();
  }

  async crearPaseo(paseo: PaseoData) {
    return await this._paseoService.crearPaseo(paseo);
  }
}
