import api from "@/lib/axios";
import { AxiosError, isAxiosError } from "axios";

const initPath = "/reunion-apoderado";

export class ReunionService {
  async getReunionesByEducador() {
    try {
      const response = await api.get(`${initPath}/getReunionesByEducador`);
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
