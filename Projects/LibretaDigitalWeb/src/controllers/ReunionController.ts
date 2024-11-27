import { ReunionService } from "@/services/ReunionService";

export class ReunionController {
  private _reunionService: ReunionService;
  constructor() {
    this._reunionService = new ReunionService();
  }

  async getReunionesByEducador() {
    return await this._reunionService.getReunionesByEducador();
  }
}
