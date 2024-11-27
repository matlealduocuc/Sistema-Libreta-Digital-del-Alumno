import { UpdatePersonaDto } from "@/dtos/Perfil/UpdatePerfilDto";
import { PerfilService } from "@/services/PerfilService";
import { UpdatePerfil } from "@/types/PerfilSchema";

export class PerfilController {
  private _perfilService: PerfilService;
  constructor() {
    this._perfilService = new PerfilService();
  }

  async getPerfil(idPersona: number) {
    const perfil = await this._perfilService.getPerfil(idPersona);
    return perfil;
  }

  async updatePerfil(idPersona: number, updatedData: UpdatePerfil) {
    const updatePerfilDto = new UpdatePersonaDto(
      idPersona,
      updatedData.email ?? "",
      updatedData.phone ?? "",
      updatedData.address ?? ""
    );
    const updatedPerfil = await this._perfilService.updatePerfil(
      updatePerfilDto
    );
    return updatedPerfil;
  }
}
