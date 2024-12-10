import {
  ComunicadoData,
  ComunicadoDataEducador,
} from "@/dtos/Comunicado/ComunicadoData";
import api from "@/lib/axios";
import { AxiosError, isAxiosError } from "axios";

const path = "/comunicado";

export class ComunicadoService {
  async getComunicadosByGrado(idGrado: number) {
    try {
      const response = await api.get(`${path}/obtenerByGrado/${idGrado}`);
      return response.data;
    } catch (error) {
      ifAxiosError(error);
    }
  }

  async getTiposComunicado() {
    try {
      const response = await api.get(`${path}/getTiposComunicado`);
      return response.data;
    } catch (error) {
      ifAxiosError(error);
    }
  }

  async getComunicadosByMenor(idMenor: number) {
    try {
      const response = await api.get(
        `${path}/getComunicadosByMenor/${idMenor}`
      );
      return response.data;
    } catch (error) {
      ifAxiosError(error);
    }
  }

  async getComunicadoByMenorComunicado(idMenor: number, idComunicado: number) {
    try {
      const response = await api.get(
        `${path}/getComunicadoByMenorComunicado/${idMenor}/${idComunicado}`
      );
      return response.data;
    } catch (error) {
      ifAxiosError(error);
    }
  }

  async confirmaConocimientoComunicadoMenor(
    idMenor: number,
    idComunicado: number
  ) {
    try {
      const response = await api.post(
        `${path}/confirmaConocimientoComunicadoMenor`,
        {
          idMenor,
          idComunicado,
        }
      );
      return response.data;
    } catch (error) {
      ifAxiosError(error);
    }
  }

  async subirComunicado(data: ComunicadoData) {
    try {
      const response = await api.post(`${path}/subirComunicado`, data);
      return response.data;
    } catch (error) {
      ifAxiosError(error);
    }
  }

  async subirComunicadoDirector(data: ComunicadoDataEducador) {
    try {
      const response = await api.post(`${path}/subirComunicadoDirector`, data);
      return response.data;
    } catch (error) {
      ifAxiosError(error);
    }
  }

  async getComunicadosByNivel(nivel: number) {
    try {
      const response = await api.get(`${path}/getComunicadosByNivel/${nivel}`);
      return response.data;
    } catch (error) {
      ifAxiosError(error);
    }
  }

  async setActivacionComunicado(idComunicado: number, estado: boolean) {
    try {
      const response = await api.post(
        `${path}/setActivacionComunicado/${idComunicado}/${estado}`
      );
      return response.data;
    } catch (error) {
      ifAxiosError(error);
    }
  }

  async deleteComunicado(idComunicado: number) {
    try {
      const response = await api.post(
        `${path}/deleteComunicado/${idComunicado}`
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
