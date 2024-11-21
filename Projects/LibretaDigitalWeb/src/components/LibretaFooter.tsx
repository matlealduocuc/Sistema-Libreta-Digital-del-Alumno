import { ObtenerInitPathName } from "@/common/FuncionesComunesUsuario";
import { useAuth } from "@/hooks/useAuth";
import {
  faBell,
  faCalendar,
  faLightbulb,
  faPenToSquare,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import HomeIcon from "./HomeIcon";

const LibretaFooter = () => {
  const { data, isLoading } = useAuth();
  const initPathName = ObtenerInitPathName();
  let bgColorClass = "bg-black";
  let textColorClass = "text-white";
  let textoHome: string = "Inicio";
  let textoAvisos: string = "Autoriza";
  let textoAsistencia: string = "Asistencia";
  let iconoAsistencia: IconDefinition = faCalendar;
  let textoMensajes: string = "Mensajes";
  if (!isLoading && data) {
    switch (data.rol) {
      case "apoderado":
        textoHome = "Inicio";
        textoAvisos = "Autoriza";
        textoAsistencia = "Asistencia";
        iconoAsistencia = faCalendar;
        textoMensajes = "Mensajes";
        bgColorClass = "bg-figma-blue";
        textColorClass = "text-white";
        break;
      case "educador":
        textoHome = "Inicio";
        textoAvisos = "Solicitudes";
        textoAsistencia = "Asistencia";
        iconoAsistencia = faCalendar;
        textoMensajes = "Mensajes";
        bgColorClass = "bg-figma-green";
        textColorClass = "text-white";
        break;
      case "director":
        textoHome = "Inicio";
        textoAvisos = "Solicitudes";
        textoAsistencia = "Ingresos";
        iconoAsistencia = faPenToSquare;
        textoMensajes = "Mensajes";
        bgColorClass = "bg-figma-purple";
        textColorClass = "text-white";
        break;
      default:
        textoHome = "Inicio";
        textoAvisos = "Asistencia";
        textoAsistencia = "Asistencia";
        iconoAsistencia = faCalendar;
        textoMensajes = "Mensajes";
        break;
    }
  }

  return (
    <div>
      {!isLoading && (
        <footer
          className={`fixed bottom-0 left-0 w-full ${bgColorClass} ${textColorClass} p-4`}
        >
          <nav className="flex justify-around items-center max-w-2xl mx-auto">
            <NavLink
              to="/libretaRedirect"
              className="flex flex-col items-center"
            >
              <HomeIcon />
              <span className="text-xs">{textoHome}</span>
            </NavLink>

            <NavLink
              to={initPathName + "/avisos/home"}
              className="flex flex-col items-center"
            >
              <FontAwesomeIcon
                icon={faBell}
                color="white"
                size="lg"
                className="p-1 w-6"
              />
              <span className="text-xs">{textoAvisos}</span>
            </NavLink>

            <NavLink
              to={initPathName + "/asistencia"}
              className="flex flex-col items-center"
            >
              <FontAwesomeIcon
                icon={iconoAsistencia}
                color="white"
                size="lg"
                className="p-1 w-6"
              />
              <span className="text-xs">{textoAsistencia}</span>
            </NavLink>

            <NavLink
              to={initPathName + "/comunicados"}
              className="flex flex-col items-center"
            >
              <FontAwesomeIcon
                icon={faLightbulb}
                color="white"
                size="lg"
                className="p-1 w-6"
              />
              <span className="text-xs">{textoMensajes}</span>
            </NavLink>
          </nav>
        </footer>
      )}
    </div>
  );
};
export default LibretaFooter;
