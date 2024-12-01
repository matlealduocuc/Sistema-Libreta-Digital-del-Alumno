import { AuthService } from "@/services/AuthService";
import { UserLoginForm } from "@/types/index";
import { LoginRutDto } from "@/dtos/Auth/LoginRutDto";
import { hashSha256 } from "@/lib/crypto";

export class AuthController {
  private _authService: AuthService;
  constructor() {
    this._authService = new AuthService();
  }

  async login(loginForm: UserLoginForm) {
    const [run, dv] = loginForm.rut.split("-");
    const runLimpio = run.replace(/\./g, "");
    const passHash = hashSha256(loginForm.password);
    const dto = new LoginRutDto(runLimpio, dv, passHash);

    const sesionIniciada = await this._authService.login(dto); 
    if (!sesionIniciada) {
      console.error("Error al iniciar sesión");
      return false;
    }
    localStorage.setItem("AUTH_USER", JSON.stringify(sesionIniciada));
    return sesionIniciada;
  }
}
