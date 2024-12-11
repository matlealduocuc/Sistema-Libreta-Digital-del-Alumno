import { NivelService } from "@/services/NivelService";

export class NivelController {
  private _nivelService: NivelService;
  constructor() {
    this._nivelService = new NivelService();
  }

  async getNivelesWhereSomeVacuna() {
    return await this._nivelService.getNivelesWhereSomeVacuna();
  }

  async getMenoresByNivel(idNivel: number) {
    return await this._nivelService.getMenoresByNivel(idNivel);
  }

  async getNivelesByEducador() {
    return await this._nivelService.getNivelesByEducador();
  }

  async getAllNiveles() {
    return await this._nivelService.getAllNiveles();
  }
}
