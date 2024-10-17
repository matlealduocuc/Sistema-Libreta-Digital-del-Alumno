import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "@/layouts/AppLayout";
import { Home } from "@/views/home/Home";
import { AuthLayout } from "./layouts/AuthLayout";
import { Login } from "./views/auth/login/Login";
import { ListaGrados } from "./views/mantenedores/grados/ListaGrados";
import { NuevoGrado } from "./views/mantenedores/grados/NuevoGrado";
import { ListaMantenedores } from "./views/mantenedores/listado/ListaMantenedores";
import LibretaLayout from "./layouts/LibretaLayout";
import LibretaHome from "./views/Libreta/LibretaHome";
import PerfilUsuario from "./views/Libreta/Perfil/PerfilUsuario";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/mantenedores/grados/lista" element={<ListaGrados />} />
          <Route path="/mantenedores/grados/nuevo" element={<NuevoGrado />} />
          <Route path="/mantenedores/lista" element={<ListaMantenedores />} />
        </Route>

        <Route path="/libreta" element={<LibretaLayout />}>
          <Route path="" element={<LibretaHome />} index />
          <Route path="home" element={<LibretaHome />} />
          <Route path="perfil" element={<PerfilUsuario />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
