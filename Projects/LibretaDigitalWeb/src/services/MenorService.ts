import api from "@/lib/axios";
import { AxiosError, isAxiosError } from "axios";

export class MenorService {
  async getSelectMenoresApoderadoByIdNivel(idNivel: number) {
    try {
      const response = await api.get(
        "/menor/getSelectMenoresApoderadoByIdNivel/" + idNivel
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      ifAxiosError(error);
    }
  }

  async getMenoresByApoderado(idPersona: number) {
    console.log(idPersona);
    return [
      {
        id: 1,
        nombre: "Menor 1",
        edad: 10,
        estadoVacuna: true,
      },
      {
        id: 2,
        nombre: "Menor 2",
        edad: 12,
        estadoVacuna: false,
      },
      {
        id: 3,
        nombre: "Menor 3",
        edad: 14,
        estadoVacuna: false,
      },
    ];
  }

  async getMenoresVacunasByApoderado() {
    try {
      const response = await api.get("/menor/getMenoresVacunasByApoderado");
      console.log(response.data);
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
      console.log(response.data);
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
      console.log(response.data);
      return response.data;
    } catch (error) {
      ifAxiosError(error);
    }
  }

  async getMenoresPaseosByApoderado() {
    try {
      const response = await api.get("/menor/getMenoresPaseosByApoderado");
      console.log(response.data);
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
      console.log(response.data);
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
      console.log(response.data);
      return response.data;
    } catch (error) {
      ifAxiosError(error);
    }
  }

  async getMenoresReunionesByApoderado() {
    try {
      const response = await api.get("/menor/getMenoresReunionesByApoderado");
      console.log(response.data);
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
      console.log(response.data);
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
      console.log(response.data);
      return response.data;
    } catch (error) {
      ifAxiosError(error);
    }
  }

  async getMenoresItinerariosByApoderado() {
    try {
      const response = await api.get("/menor/getMenoresItinerariosByApoderado");
      console.log(response.data);
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
      console.log(response.data);
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
