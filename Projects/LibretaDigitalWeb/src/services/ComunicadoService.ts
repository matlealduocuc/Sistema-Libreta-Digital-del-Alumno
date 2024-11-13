import api from "@/lib/axios";
import { AxiosError, isAxiosError } from "axios";

export class ComunicadoService {
  async getComunicadosByGrado(idGrado: number) {
    try {
      const response = await api.get("/comunicado/obtenerByGrado/" + idGrado);
      console.log(response.data);
      return response.data;
    } catch (error) {
      ifAxiosError(error);
    }
  }

  async getTiposComunicado() {
    try {
      const response = await api.get("/comunicado/getTipos");
      console.log("Response data:", response.data);
      return response.data;
    } catch (error) {
      ifAxiosError(error);
    }
  }
}

const ifAxiosError = (error: unknown): error is AxiosError => {
  if (isAxiosError(error) && error.response) {
    console.error("Error response:", error.response.data);
    throw new Error(error.response.data.error);
  } else {
    console.error("Unexpected error:", error);
    throw new Error("Unexpected error occurred");
  }
};
