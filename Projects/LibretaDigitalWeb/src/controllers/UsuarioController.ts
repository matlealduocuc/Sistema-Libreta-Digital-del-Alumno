import { UsuarioService } from "@/services/UsuarioService";

export class UsuarioController {
  private _usuarioService: UsuarioService;
  constructor() {
    this._usuarioService = new UsuarioService();
  }

  async getAllApoderados() {
    return await this._usuarioService.getAllApoderados();
  }
}
