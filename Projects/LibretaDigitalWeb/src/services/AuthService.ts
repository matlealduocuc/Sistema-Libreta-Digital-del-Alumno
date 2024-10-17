import api from "@/lib/axios";
import { LoginRutDto } from "dtos/LoginRutDto";

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
}