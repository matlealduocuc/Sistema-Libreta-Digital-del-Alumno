import { GradoService } from "@/services/GradoService";

export class GradoController {
  private _gradoService: GradoService;
  constructor() {
    this._gradoService = new GradoService();
  }

  async getGradosByEducadorIdPersona() {
    const grados = await this._gradoService.getGradosByEducadorIdPersona();
    return grados;
  }
}