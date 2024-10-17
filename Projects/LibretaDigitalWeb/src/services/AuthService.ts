import api from "@/lib/axios";
import { LoginRutDto } from "@/dtos/Auth/LoginRutDto";
import { isAxiosError } from "axios";

export class AuthService {
  async login(loginRutDto: LoginRutDto) {
    try {
      const response = await api.post("/auth/login", loginRutDto);
      return response.data;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  static async getUsuario() {
    try {
      const response = await api.get("/auth/user");
      console.log(response.data);
      return response.data;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        throw new Error(error.response.data.error);
      }
    }
  }
}
