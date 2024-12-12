import { NewApoderadoData } from "@/dtos/Usuario/NewApoderadoData";
import { UsuarioService } from "@/services/UsuarioService";
import { hashSha256 } from "@/lib/crypto";

export class UsuarioController {
  private _usuarioService: UsuarioService;
  constructor() {
    this._usuarioService = new UsuarioService();
  }

  async getAllApoderados() {
    return await this._usuarioService.getAllApoderados();
  }

  async setActivacionApoderado(idApoderado: number, estado: boolean) {
    return await this._usuarioService.setActivacionApoderado(
      idApoderado,
      estado
    );
  }

  async deleteApoderado(idApoderado: number) {
    return await this._usuarioService.deleteApoderado(
      idApoderado
    );
  }

  async getSexos() {
    return await this._usuarioService.getSexos();
  }

  async crearNuevoApoderado(data: NewApoderadoData) {
    const passHash = hashSha256(data.password);
    data.password = passHash;
    return await this._usuarioService.crearNuevoApoderado(data);
  }
}
