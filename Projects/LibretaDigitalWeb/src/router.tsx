import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "@/layouts/AppLayout";
import { Home } from "@/views/home/Home";
import { AuthLayout } from "./layouts/AuthLayout";
import { Login } from "./views/auth/login/Login";
import { ListaGrados } from "./views/mantenedores/grados/ListaGrados";
import { NuevoGrado } from "./views/mantenedores/grados/NuevoGrado";
import { ListaMantenedores } from "./views/mantenedores/listado/ListaMantenedores";
import EducadorLayout from "./layouts/EducadorLayout";
import LibretaEducadorHome from "./views/Libreta/Educador/LibretaEducadorHome";
import PerfilUsuario from "./views/Libreta/Perfil/PerfilUsuario";
import EducadorComunicados from "./views/Libreta/Educador/EducadorComunicados";
import CrearComunicado from "./views/Libreta/Educador/CrearComunicado";
import LibretaRedirect from "./views/home/LibretaRedirect";
import ApoderadoLayout from "./layouts/ApoderadoLayout";
import LibretaApoderadoHome from "./views/Libreta/Apoderado/LibretaApoderadoHome";
import ApoderadoAvisosHome from "./views/Libreta/Apoderado/Avisos/Home";
import VacunasListadoMenores from "./views/Libreta/Apoderado/Avisos/Vacunas/ListadoMenores";
import AutorizarVacunaMenor from "./views/Libreta/Apoderado/Avisos/Vacunas/Autorizar";
import PaseosVisitasListadoMenores from "./views/Libreta/Apoderado/Avisos/PaseosVisitas/ListadoMenores";
import AutorizarPaseoVisitaMenor from "./views/Libreta/Apoderado/Avisos/PaseosVisitas/Autorizar";
import ReunionesApoderadosListadoMenores from "./views/Libreta/Apoderado/Avisos/ReunionesApoderados/ListadoMenores";
import ConfirmarReunionesApoderadosMenor from "./views/Libreta/Apoderado/Avisos/ReunionesApoderados/Confirmar";
import ItinerarioJornadaListadoMenores from "./views/Libreta/Apoderado/Avisos/ItinerarioJornada/ListadoMenores";
import ConfirmarItinerarioJornadaMenor from "./views/Libreta/Apoderado/Avisos/ItinerarioJornada/Confirmar";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/mantenedores/grados/lista" element={<ListaGrados />} />
          <Route path="/mantenedores/grados/nuevo" element={<NuevoGrado />} />
          <Route path="/mantenedores/lista" element={<ListaMantenedores />} />
        </Route>

        <Route path="/educador" element={<EducadorLayout />}>
          <Route path="" element={<LibretaEducadorHome />} index />
          <Route path="home" element={<LibretaEducadorHome />} />
          <Route path="perfil" element={<PerfilUsuario />} />
          <Route path="comunicados" element={<EducadorComunicados />} />
          <Route path="crear-comunicado" element={<CrearComunicado />} />
        </Route>

        <Route path="/apoderado" element={<ApoderadoLayout />}>
          <Route path="" element={<LibretaApoderadoHome />} index />
          <Route path="home" element={<LibretaApoderadoHome />} />
          <Route path="perfil" element={<PerfilUsuario />} />
          <Route path="comunicados" element={<EducadorComunicados />} />
          <Route path="crear-comunicado" element={<CrearComunicado />} />
          <Route path="avisos/home" element={<ApoderadoAvisosHome />} />
          <Route
            path="avisos/vacunas/listado-menores"
            element={<VacunasListadoMenores />}
          />
          <Route
            path="avisos/vacunas/menor/:id"
            element={<AutorizarVacunaMenor />}
          />
          <Route
            path="avisos/paseos-visitas/listado-menores"
            element={<PaseosVisitasListadoMenores />}
          />
          <Route
            path="avisos/paseos-visitas/menor/:id"
            element={<AutorizarPaseoVisitaMenor />}
          />
          <Route
            path="avisos/reuniones-apoderados/listado-menores"
            element={<ReunionesApoderadosListadoMenores />}
          />
          <Route
            path="avisos/reuniones-apoderados/menor/:id"
            element={<ConfirmarReunionesApoderadosMenor />}
          />
          <Route
            path="avisos/itinerario-jornada/listado-menores"
            element={<ItinerarioJornadaListadoMenores />}
          />
          <Route
            path="avisos/itinerario-jornada/menor/:id"
            element={<ConfirmarItinerarioJornadaMenor />}
          />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/" element={<Login />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/libretaRedirect" element={<LibretaRedirect />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
