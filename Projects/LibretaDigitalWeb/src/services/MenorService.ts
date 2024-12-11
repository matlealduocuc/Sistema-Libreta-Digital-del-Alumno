import api from "@/lib/axios";
import { AxiosError, isAxiosError } from "axios";

export class MenorService {
  async getSelectMenoresApoderadoByIdNivel(idNivel: number) {
    try {
      const response = await api.get(
        "/menor/getSelectMenoresApoderadoByIdNivel/" + idNivel
      );
      return response.data;
    } catch (error) {
      ifAxiosError(error);
    }
  }

  async getMenoresByApoderado() {
    try {
      const response = await api.get("/menor/getMenoresByApoderado");
      return response.data;
    } catch (error) {
      ifAxiosError(error);
    }
  }

  async getMenoresVacunasByApoderado() {
    try {
      const response = await api.get("/menor/getMenoresVacunasByApoderado");
      return response.data;
    } catch (error) {
      ifAxiosError(error);
    }
  }

  async getMenorVacunasByMenorAndApoderado(idMenor: number) {
    try {
      const response = await api.get(
        "/menor/getMenorVacunasByMenorAndApoderado/" + idMenor
      );
      return response.data;
    } catch (error) {
      ifAxiosError(error);
    }
  }

  async autorizarVacunaMenor(idMenor: number, idVacuna: number) {
    try {
      const response = await api.post("/menor/autorizarVacunaMenor", {
        idMenor,
        idVacuna,
      });
      return response.data;
    } catch (error) {
      ifAxiosError(error);
    }
  }

  async getMenoresPaseosByApoderado() {
    try {
      const response = await api.get("/menor/getMenoresPaseosByApoderado");
      return response.data;
    } catch (error) {
      ifAxiosError(error);
    }
  }

  async getMenorPaseoByMenorPaseoAndApoderado(
    idMenor: number,
    idPaseo: number
  ) {
    try {
      const response = await api.get(
        `/menor/getMenorPaseoByMenorPaseoAndApoderado/${idMenor}/${idPaseo}`
      );
      return response.data;
    } catch (error) {
      ifAxiosError(error);
    }
  }

  async autorizarPaseoMenor(idMenor: number, idPaseo: number) {
    try {
      const response = await api.post("/menor/autorizarPaseoMenor", {
        idMenor,
        idPaseo,
      });
      return response.data;
    } catch (error) {
      ifAxiosError(error);
    }
  }

  async getMenoresReunionesByApoderado() {
    try {
      const response = await api.get("/menor/getMenoresReunionesByApoderado");
      return response.data;
    } catch (error) {
      ifAxiosError(error);
    }
  }

  async getMenorReunionByMenorPaseoAndApoderado(
    idMenor: number,
    idReunion: number
  ) {
    try {
      const response = await api.get(
        `/menor/getMenorReunionByMenorPaseoAndApoderado/${idMenor}/${idReunion}`
      );
      return response.data;
    } catch (error) {
      ifAxiosError(error);
    }
  }

  async confirmaReunionMenor(idMenor: number, idReunion: number) {
    try {
      const response = await api.post("/menor/confirmaReunionMenor", {
        idMenor,
        idReunion,
      });
      return response.data;
    } catch (error) {
      ifAxiosError(error);
    }
  }

  async getMenoresItinerariosByApoderado() {
    try {
      const response = await api.get("/menor/getMenoresItinerariosByApoderado");
      return response.data;
    } catch (error) {
      ifAxiosError(error);
    }
  }

  async getMenorItinerarioByMenorPaseoAndApoderado(
    idMenor: number,
    idItinerario: number
  ) {
    try {
      const response = await api.get(
        `/menor/getMenorItinerarioByMenorPaseoAndApoderado/${idMenor}/${idItinerario}`
      );
      return response.data;
    } catch (error) {
      ifAxiosError(error);
    }
  }

  async confirmaItinerarioMenor(idMenor: number, idItinerario: number) {
    try {
      const response = await api.post("/menor/confirmaItinerarioMenor", {
        idMenor,
        idItinerario,
      });
      return response.data;
    } catch (error) {
      ifAxiosError(error);
    }
  }

  async getMenoresDataByApoderado() {
    try {
      const response = await api.get("/menor/getMenoresDataByApoderado");
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
