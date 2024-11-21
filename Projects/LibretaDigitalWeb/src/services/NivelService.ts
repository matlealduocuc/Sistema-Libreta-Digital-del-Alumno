import api from "@/lib/axios";
import { AxiosError, isAxiosError } from "axios";

export class NivelService {
  async getNivelesByEducador(idPersona: number) {
    console.log(idPersona);
    return [
      {
        id: 1,
        nombre: "Nivel 1",
        cantidadMenores: 10,
      },
      {
        id: 2,
        nombre: "Nivel 2",
        cantidadMenores: 12,
      },
      {
        id: 3,
        nombre: "Nivel 3",
        cantidadMenores: 14,
      },
    ];
  }

  async getNivelesWhereSomeVacuna() {
    try {
      const response = await api.get("/nivel/getNivelesWhereSomeVacuna");
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
