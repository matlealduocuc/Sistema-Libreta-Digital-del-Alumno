import api from "@/lib/axios";
import { AxiosError, isAxiosError } from "axios";

const path = "/sala";

export class SalaService {
  async getSalas() {
    try {
      const response = await api.get(`${path}/getSalas`);
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
