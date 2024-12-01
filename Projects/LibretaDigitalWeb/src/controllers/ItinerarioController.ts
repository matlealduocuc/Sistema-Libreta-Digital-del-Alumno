import { ItinerarioService } from "@/services/ItinerarioService";

export class ItinerarioController {
  private _itinerarioService: ItinerarioService;
  constructor() {
    this._itinerarioService = new ItinerarioService();
  }

  async getItinerariosByEducador() {
    return await this._itinerarioService.getItinerariosByEducador();
  }

  async getNivelesByItinerario(idItinerario: number) {
    return await this._itinerarioService.getNivelesByItinerario(idItinerario);
  }

  async getMenoresByItinerarioNivel(idItinerario: number, idNivel: number) {
    return await this._itinerarioService.getMenoresByItinerarioNivel(
      idItinerario,
      idNivel
    );
  }

  async getMenorByItinerarioNivelMenor(
    idItinerario: number,
    idNivel: number,
    idMenor: number
  ) {
    return await this._itinerarioService.getMenorByItinerarioNivelMenor(
      idItinerario,
      idNivel,
      idMenor
    );
  }
}
