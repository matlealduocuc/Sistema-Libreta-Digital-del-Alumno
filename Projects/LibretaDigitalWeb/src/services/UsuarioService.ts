import { NewApoderadoData } from "@/dtos/Usuario/NewApoderadoData";
import api from "@/lib/axios";
import { AxiosError, isAxiosError } from "axios";

const path = "/usuario";

export class UsuarioService {
  async getAllApoderados() {
    try {
      const response = await api.get(`${path}/getAllApoderados`);
      return response.data;
    } catch (error) {
      ifAxiosError(error);
    }
  }

  async setActivacionApoderado(idApoderado: number, estado: boolean) {
    try {
      const response = await api.post(
        `${path}/setActivacionApoderado/${idApoderado}/${estado}`
      );
      return response.data;
    } catch (error) {
      ifAxiosError(error);
    }
  }

  async deleteApoderado(idApoderado: number) {
    try {
      const response = await api.post(`${path}/deleteApoderado/${idApoderado}`);
      return response.data;
    } catch (error) {
      ifAxiosError(error);
    }
  }

  async getSexos() {
    try {
      const response = await api.get(`${path}/getSexos`);
      return response.data;
    } catch (error) {
      ifAxiosError(error);
    }
  }

  async crearNuevoApoderado(data: NewApoderadoData) {
    try {
      const response = await api.post(`${path}/crearNuevoApoderado`, data);
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
