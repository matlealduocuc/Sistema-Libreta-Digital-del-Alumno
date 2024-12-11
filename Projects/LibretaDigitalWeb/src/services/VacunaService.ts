import api from "@/lib/axios";
import { AxiosError, isAxiosError } from "axios";

const path = "/vacuna";

export class VacunaService {
  async getMenorByNivelMenor(idNivel: number, idMenor: number) {
    try {
      const response = await api.get(
        `${path}/getMenorByNivelMenor/${idNivel}/${idMenor}`
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      ifAxiosError(error);
    }
  }

  async getNivelesAvisarVacunaByEducador() {
    try {
      const response = await api.get(
        `${path}/getNivelesAvisarVacunaByEducador`
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      ifAxiosError(error);
    }
  }

  async getNivelVacunaByNivel(idNivel: number) {
    try {
      const response = await api.get(
        `${path}/getNivelVacunaByNivel/${idNivel}`
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      ifAxiosError(error);
    }
  }

  async solicitarVacunaNivel(
    idNivel: number,
    nombVacuna: string,
    fechVacuna: Date
  ) {
    try {
      const response = await api.post(
        `${path}/solicitarVacunaNivel/${idNivel}`,
        {
          nombVacuna,
          fechVacuna,
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      ifAxiosError(error);
    }
  }

  async solicitarVacunaMenoresNivel(idNivel: number, idVacuna: number) {
    try {
      const response = await api.post(
        `${path}/solicitarVacunaMenoresNivel/${idNivel}/${idVacuna}`
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
