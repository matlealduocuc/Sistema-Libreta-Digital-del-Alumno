import { VacunaService } from "@/services/VacunaService";

export class VacunaController {
  private _vacunaService: VacunaService;
  constructor() {
    this._vacunaService = new VacunaService();
  }

  async getMenorByNivelMenor(idNivel: number, idMenor: number) {
    return await this._vacunaService.getMenorByNivelMenor(idNivel, idMenor);
  }

  async getNivelesAvisarVacunaByEducador() {
    return await this._vacunaService.getNivelesAvisarVacunaByEducador();
  }

  async getNivelVacunaByNivel(idNivel: number) {
    return await this._vacunaService.getNivelVacunaByNivel(idNivel);
  }

  async solicitarVacunaNivel(
    idNivel: number,
    nombVacuna: string,
    fechVacuna: Date
  ) {
    return await this._vacunaService.solicitarVacunaNivel(
      idNivel,
      nombVacuna,
      fechVacuna
    );
  }

  async solicitarVacunaMenoresNivel(idNivel: number, idVacuna: number) {
    return await this._vacunaService.solicitarVacunaMenoresNivel(
      idNivel,
      idVacuna
    );
  }
}
