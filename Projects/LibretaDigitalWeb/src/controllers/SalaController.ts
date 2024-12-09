import { SalaService } from "@/services/SalaService";

export class SalaController {
  private _salaService: SalaService;
  constructor() {
    this._salaService = new SalaService();
  }

  async getSalas() {
    return await this._salaService.getSalas();
  }
}
