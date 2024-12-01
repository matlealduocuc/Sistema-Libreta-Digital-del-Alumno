import api from "@/lib/axios";
import { AxiosError, isAxiosError } from "axios";

const path = "/itinerario";

export class ItinerarioService {
  async getItinerariosByEducador() {
    try {
      const response = await api.get(`${path}/getItinerariosByEducador`);
      return response.data;
    } catch (error) {
      ifAxiosError(error);
    }
  }

  async getNivelesByItinerario(idItinerario: number) {
    try {
      const response = await api.get(
        `${path}/getNivelesByItinerario/${idItinerario}`
      );
      return response.data;
    } catch (error) {
      ifAxiosError(error);
    }
  }

  async getMenoresByItinerarioNivel(idItinerario: number, idNivel: number) {
    try {
      const response = await api.get(
        `${path}/getMenoresByItinerarioNivel/${idItinerario}/${idNivel}`
      );
      return response.data;
    } catch (error) {
      ifAxiosError(error);
    }
  }

  async getMenorByItinerarioNivelMenor(
    idItinerario: number,
    idNivel: number,
    idMenor: number
  ) {
    try {
      const response = await api.get(
        `${path}/getMenorByItinerarioNivelMenor/${idItinerario}/${idNivel}/${idMenor}`
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
