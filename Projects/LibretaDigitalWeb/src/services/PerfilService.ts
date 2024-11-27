import { UpdatePersonaDto } from "@/dtos/Perfil/UpdatePerfilDto";
import api from "@/lib/axios";
import { isAxiosError } from "axios";

export class PerfilService {
  async getPerfil(idPersona: number) {
    try {
      const response = await api.get("/persona/obtener/" + idPersona);
      return response.data;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        throw new Error(error.response.data.error);
      }
    }
  }

  async updatePerfil(updatedData: UpdatePersonaDto) {
    try {
      const response = await api.post("persona/actualizar", updatedData);
      return response.data;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        console.error("Error response:", error.response.data);
        throw new Error(error.response.data.error);
      } else {
        console.error("Unexpected error:", error);
        throw new Error("Unexpected error occurred");
      }
    }
  }
}
