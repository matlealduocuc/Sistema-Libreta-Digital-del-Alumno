import api from "@/lib/axios";
import { AxiosError, isAxiosError } from "axios";

export class PaseoService {
  async getPaseosByEducador() {
    try {
      const response = await api.get(`/paseo/getPaseosByEducador`);
      return response.data;
    } catch (error) {
      ifAxiosError(error);
    }
  }

  async getNivelesByPaseo(idPaseo: number) {
    try {
      const response = await api.get(`/paseo/getNivelesByPaseo/${idPaseo}`);
      return response.data;
    } catch (error) {
      ifAxiosError(error);
    }
  }

  async getMenoresByPaseoNivel(idPaseo: number, idNivel: number) {
    try {
      const response = await api.get(
        `/paseo/getMenoresByPaseoNivel/${idPaseo}/${idNivel}`
      );
      return response.data;
    } catch (error) {
      ifAxiosError(error);
    }
  }

  async getMenorByPaseoNivelMenor(
    idPaseo: number,
    idNivel: number,
    idMenor: number
  ) {
    try {
      const response = await api.get(
        `/paseo/getMenorByPaseoNivelMenor/${idPaseo}/${idNivel}/${idMenor}`
      );
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
