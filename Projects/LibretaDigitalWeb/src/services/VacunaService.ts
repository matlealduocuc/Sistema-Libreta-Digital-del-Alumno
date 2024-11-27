import api from "@/lib/axios";
import { AxiosError, isAxiosError } from "axios";

export class VacunaService {
  async getMenorByNivelMenor(idNivel: number, idMenor: number) {
    try {
      const response = await api.get(
        `/vacuna/getMenorByNivelMenor/${idNivel}/${idMenor}`
      );
      console.log(response.data);
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
