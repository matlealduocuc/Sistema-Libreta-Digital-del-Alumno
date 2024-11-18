import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "@/layouts/AppLayout";
import { Home } from "@/views/home/Home";
import { AuthLayout } from "./layouts/AuthLayout";
import { Login } from "./views/auth/login/Login";
import { ListaGrados } from "./views/mantenedores/grados/ListaGrados";
import { NuevoGrado } from "./views/mantenedores/grados/NuevoGrado";
import { ListaMantenedores } from "./views/mantenedores/listado/ListaMantenedores";
import LibretaLayout from "./layouts/LibretaLayout";
import LibretaEducadorHome from "./views/Libreta/Educador/LibretaEducadorHome";
import PerfilUsuario from "./views/Libreta/Perfil/PerfilUsuario";
import EducadorComunicados from "./views/Libreta/Educador/EducadorComunicados";
import CrearComunicado from "./views/Libreta/Educador/CrearComunicado";
import LibretaRedirect from "./views/home/LibretaRedirect";
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
import EducadorAvisosHome from "./views/Libreta/Educador/Avisos/Home";
import ListadoNivelesAutorizadosVacuna from "./views/Libreta/Educador/Avisos/Vacunas/ListadoNiveles";
import ListadoMenoresAutorizadosVacunas from "./views/Libreta/Educador/Avisos/Vacunas/ListadoMenoresAutorizados";
import RevisarVacunaMenor from "./views/Libreta/Educador/Avisos/Vacunas/RevisarAutorizacion";
import ListadoAvisarNivelesEducador from "./views/Libreta/Educador/Avisos/Vacunas/ListadoAvisarNiveles";
import SolicitarVacunas from "./views/Libreta/Educador/Avisos/Vacunas/SolicitarVacunas";

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

        <Route path="/educador" element={<LibretaLayout />}>
          <Route path="" element={<LibretaEducadorHome />} index />
          <Route path="home" element={<LibretaEducadorHome />} />
          <Route path="perfil" element={<PerfilUsuario />} />
          <Route path="comunicados" element={<EducadorComunicados />} />
          <Route path="crear-comunicado" element={<CrearComunicado />} />
          <Route path="avisos">
            <Route path="home" element={<EducadorAvisosHome />} />
            <Route path="vacunas">
              <Route
                path="revisar-niveles-menores"
                element={<ListadoNivelesAutorizadosVacuna />}
              />
              <Route
                path="menores-por-nivel/:id"
                element={<ListadoMenoresAutorizadosVacunas />}
              />
              <Route
                path="revisar-menor/:id"
                element={<RevisarVacunaMenor />}
              />
              <Route
                path="avisar-niveles-menores"
                element={<ListadoAvisarNivelesEducador />}
              />
              <Route
                path="solicitar-vacunas/:id"
                element={<SolicitarVacunas />}
              />
            </Route>
            <Route path="paseos-visitas">
              <Route
                path="listado-menores"
                element={<PaseosVisitasListadoMenores />}
              />
              <Route path="menor/:id" element={<AutorizarPaseoVisitaMenor />} />
            </Route>
            <Route path="reuniones-apoderados">
              <Route
                path="listado-menores"
                element={<ReunionesApoderadosListadoMenores />}
              />
              <Route
                path="menor/:id"
                element={<ConfirmarReunionesApoderadosMenor />}
              />
            </Route>
            <Route path="itinerario-jornada">
              <Route
                path="listado-menores"
                element={<ItinerarioJornadaListadoMenores />}
              />
              <Route
                path="menor/:id"
                element={<ConfirmarItinerarioJornadaMenor />}
              />
            </Route>
          </Route>
        </Route>

        <Route path="/apoderado" element={<LibretaLayout />}>
          <Route path="" element={<LibretaApoderadoHome />} index />
          <Route path="home" element={<LibretaApoderadoHome />} />
          <Route path="perfil" element={<PerfilUsuario />} />
          <Route path="avisos">
            <Route path="home" element={<ApoderadoAvisosHome />} />
            <Route path="vacunas">
              <Route
                path="listado-menores"
                element={<VacunasListadoMenores />}
              />
              <Route path="menor/:id" element={<AutorizarVacunaMenor />} />
            </Route>
            <Route path="paseos-visitas">
              <Route
                path="listado-menores"
                element={<PaseosVisitasListadoMenores />}
              />
              <Route path="menor/:id" element={<AutorizarPaseoVisitaMenor />} />
            </Route>
            <Route path="reuniones-apoderados">
              <Route
                path="listado-menores"
                element={<ReunionesApoderadosListadoMenores />}
              />
              <Route
                path="menor/:id"
                element={<ConfirmarReunionesApoderadosMenor />}
              />
            </Route>
            <Route path="itinerario-jornada">
              <Route
                path="listado-menores"
                element={<ItinerarioJornadaListadoMenores />}
              />
              <Route
                path="menor/:id"
                element={<ConfirmarItinerarioJornadaMenor />}
              />
            </Route>
          </Route>
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/" element={<Login />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/libretaRedirect" element={<LibretaRedirect />} />
          <Route path="*" element={<LibretaRedirect />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
