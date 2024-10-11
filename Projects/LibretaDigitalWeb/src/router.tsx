import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "@/layouts/AppLayout";
import { Home } from "@/views/home/Home";
import { AuthLayout } from "./layouts/AuthLayout";
import { Login } from "./views/auth/login/Login";
import { ListaGrados } from "./views/mantenedores/grados/ListaGrados";
import { NuevoGrado } from "./views/mantenedores/grados/NuevoGrado";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} index />
          <Route path="/home" element={<Home />} />
          <Route path="/mantenedores/grados/lista" element={<ListaGrados />} />
          <Route path="/mantenedores/grados/nuevo" element={<NuevoGrado />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/auth/login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
