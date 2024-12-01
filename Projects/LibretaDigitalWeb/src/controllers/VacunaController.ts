import { VacunaService } from "@/services/VacunaService";

export class VacunaController {
  private _vacunaService: VacunaService;
  constructor() {
    this._vacunaService = new VacunaService();
  }

  async getMenorByNivelMenor(idNivel: number, idMenor: number) {
    return await this._vacunaService.getMenorByNivelMenor(idNivel, idMenor);
  }
}
