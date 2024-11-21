import { NivelService } from "@/services/NivelService";

export class NivelController {
  private _nivelService: NivelService;
  constructor() {
    this._nivelService = new NivelService();
  }

  async getNivelesByEducador(idPersona: number) {
    return await this._nivelService.getNivelesByEducador(idPersona);
  }

  async getNivelesWhereSomeVacuna() {
    return await this._nivelService.getNivelesWhereSomeVacuna();
  }
}
