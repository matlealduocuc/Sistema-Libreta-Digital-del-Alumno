import { UpdatePerfilDto } from "@/dtos/Perfil/UpdatePerfilDto";
import api from "@/lib/axios";
import { isAxiosError } from "axios";

export class PerfilService {
  async getPerfil(idPersona: number) {
    try {
      const response = await api.get("/persona/obtener/" + idPersona);
      console.log(response.data);
      return response.data;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        throw new Error(error.response.data.error);
      }
    }
  }

  async updatePerfil(idPersona: number, updatedData: UpdatePerfilDto) {
    try {
      const response = await api.patch(
        `/persona/actualizar/${idPersona}`,
        updatedData
      );
      return response.data;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        throw new Error(error.response.data.error);
      }
    }
  }
}
