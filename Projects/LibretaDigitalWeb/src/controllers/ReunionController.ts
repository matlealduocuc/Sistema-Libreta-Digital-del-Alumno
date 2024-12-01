import { ReunionService } from "@/services/ReunionService";

export class ReunionController {
  private _reunionService: ReunionService;
  constructor() {
    this._reunionService = new ReunionService();
  }

  async getReunionesByEducador() {
    return await this._reunionService.getReunionesByEducador();
  }

  async getNivelesByReunion(idReunion: number) {
    return await this._reunionService.getNivelesByReunion(idReunion);
  }

  async getMenoresByReunionNivel(idReunion: number, idNivel: number) {
    return await this._reunionService.getMenoresByReunionNivel(
      idReunion,
      idNivel
    );
  }

  async getMenorByReunionNivelMenor(
    idReunion: number,
    idNivel: number,
    idMenor: number
  ) {
    return await this._reunionService.getMenorByReunionNivelMenor(
      idReunion,
      idNivel,
      idMenor
    );
  }
}
