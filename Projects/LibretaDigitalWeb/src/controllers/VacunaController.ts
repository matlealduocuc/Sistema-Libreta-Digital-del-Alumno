import { VacunaService } from "@/services/VacunaService";

export class VacunaController {
  private _vacunaService: VacunaService;
  constructor() {
    this._vacunaService = new VacunaService();
  }

  async getMenorByNivelMenor(idNivel: number, idMenor: number) {
    return await this._vacunaService.getMenorByNivelMenor(idNivel, idMenor);
  }

  async getMenorByNivelMenorDirector(idNivel: number, idMenor: number) {
    return await this._vacunaService.getMenorByNivelMenorDirector(
      idNivel,
      idMenor
    );
  }

  async getNivelesAvisarVacunaByEducador() {
    return await this._vacunaService.getNivelesAvisarVacunaByEducador();
  }

  async getAllNivelesAvisarVacuna() {
    return await this._vacunaService.getAllNivelesAvisarVacuna();
  }

  async getNivelVacunaByNivel(idNivel: number) {
    return await this._vacunaService.getNivelVacunaByNivel(idNivel);
  }

  async getNivelVacunaByNivelDirector(idNivel: number) {
    return await this._vacunaService.getNivelVacunaByNivelDirector(idNivel);
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

  async solicitarVacunaNivelDirector(
    idNivel: number,
    nombVacuna: string,
    fechVacuna: Date
  ) {
    return await this._vacunaService.solicitarVacunaNivelDirector(
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

  async solicitarVacunaMenoresNivelDirector(idNivel: number, idVacuna: number) {
    return await this._vacunaService.solicitarVacunaMenoresNivelDirector(
      idNivel,
      idVacuna
    );
  }
}
