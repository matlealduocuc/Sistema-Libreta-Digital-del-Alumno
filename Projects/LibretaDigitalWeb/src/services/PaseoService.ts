import { PaseoData } from "@/dtos/Paseo/PaseoData";
import api from "@/lib/axios";
import { AxiosError, isAxiosError } from "axios";

const path = "/paseo";

export class PaseoService {
  async getPaseosByEducador() {
    try {
      const response = await api.get(`${path}/getPaseosByEducador`);
      return response.data;
    } catch (error) {
      ifAxiosError(error);
    }
  }

  async getNivelesByPaseo(idPaseo: number) {
    try {
      const response = await api.get(`${path}/getNivelesByPaseo/${idPaseo}`);
      return response.data;
    } catch (error) {
      ifAxiosError(error);
    }
  }

  async getMenoresByPaseoNivel(idPaseo: number, idNivel: number) {
    try {
      const response = await api.get(
        `${path}/getMenoresByPaseoNivel/${idPaseo}/${idNivel}`
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
        `${path}/getMenorByPaseoNivelMenor/${idPaseo}/${idNivel}/${idMenor}`
      );
      return response.data;
    } catch (error) {
      ifAxiosError(error);
    }
  }

  async getTiposPaseo() {
    try {
      const response = await api.get(`${path}/getTiposPaseo`);
      return response.data;
    } catch (error) {
      ifAxiosError(error);
    }
  }

  async crearPaseo(data: PaseoData) {
    try {
      const response = await api.post(`${path}/crearPaseo`, data);
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
