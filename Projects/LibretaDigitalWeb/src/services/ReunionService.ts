import api from "@/lib/axios";
import { AxiosError, isAxiosError } from "axios";

const path = "/reunion-apoderado";

export class ReunionService {
  async getReunionesByEducador() {
    try {
      const response = await api.get(`${path}/getReunionesByEducador`);
      return response.data;
    } catch (error) {
      ifAxiosError(error);
    }
  }

  async getNivelesByReunion(idReunion: number) {
    try {
      const response = await api.get(
        `${path}/getNivelesByReunion/${idReunion}`
      );
      return response.data;
    } catch (error) {
      ifAxiosError(error);
    }
  }

  async getMenoresByReunionNivel(idReunion: number, idNivel: number) {
    try {
      const response = await api.get(
        `${path}/getMenoresByReunionNivel/${idReunion}/${idNivel}`
      );
      return response.data;
    } catch (error) {
      ifAxiosError(error);
    }
  }

  async getMenorByReunionNivelMenor(
    idReunion: number,
    idNivel: number,
    idMenor: number
  ) {
    try {
      const response = await api.get(
        `${path}/getMenorByReunionNivelMenor/${idReunion}/${idNivel}/${idMenor}`
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
