import { Outlet, useLocation, useNavigate } from "react-router-dom";
import LibretaHeader from "@/components/LibretaHeader";
import LibretaFooter from "@/components/LibretaFooter";
import { AuthorizedUserDto } from "@/dtos/Auth/AuthorizedUserDto";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import React from "react";
import { Spin } from "antd";

const LibretaLayout = () => {
  const { data, isError, isLoading } = useAuth();
  const [loadingLayout, setLoadingLayout] = React.useState<boolean>(true);
  const storedUser = localStorage.getItem("AUTH_USER");
  const usuario: AuthorizedUserDto = storedUser ? JSON.parse(storedUser) : null;
  const location = useLocation();
  const navigate = useNavigate();
  const pathName = location.pathname
    .split("/")
    ?.splice(2, 2)
    .join("/")
    .toLowerCase();
  const pathsQuitarHeader = ["avisos/home"];

  let initPathName: string = "";
  if (!isLoading && data) {
    switch (data.rol) {
      case "apoderado":
        initPathName = "/apoderado";
        break;
      case "educador":
        initPathName = "/educador";
        break;
      case "director":
        initPathName = "/director";
        break;
      default:
        initPathName = "/";
        break;
    }
  }

  useEffect(() => {
    setLoadingLayout(isLoading);
    if (!isLoading && isError) {
      return navigate("/login");
    } else {
      if (!isLoading && data) {
        const pathRol = location.pathname.split("/")[1].trim().toLowerCase();
        const rol = data.rol.trim().toLowerCase();
        if (pathRol && pathRol != rol) {
          return navigate("/libretaRedirect");
        }
      }
    }
  }, [isLoading, isError, data, navigate, location.pathname]);

  const bienvenidoSexo: string =
    usuario?.persona.sexo === "F"
      ? "Bienvenida"
      : usuario?.persona.sexo === "M"
      ? "Bienvenido"
      : "Bienvenid@";
  const primerNombreUpper: string = usuario?.persona.primerNombre.toUpperCase();
  const bienvenidaText: string = `${bienvenidoSexo} ${primerNombreUpper}`;

  const avisosPath = initPathName + "/avisos";
  const pageTitles: { [key: string]: string } = {
    [initPathName]: bienvenidaText,
    [initPathName + "/"]: bienvenidaText,
    [initPathName + "/comunicate"]: "Comunícate",
    [initPathName + "/informate"]: "Infórmate",
    [initPathName + "/perfil"]: "Perfil del Usuario",
    [avisosPath]: "Avisos",
    [avisosPath + "/home"]: "Avisos",
    [avisosPath + "/vacunas/listado-menores"]: "Vacunas",
    [avisosPath + "/vacunas/menor"]: "Vacunas",
    [avisosPath + "/paseos-visitas/listado-menores"]: "Paseos y Visitas",
    [avisosPath + "/paseos-visitas/menor"]: "Paseos y Visitas",
    [avisosPath + "/reuniones-apoderados/listado-menores"]:
      "Reuniones de Apoderados",
    [avisosPath + "/reuniones-apoderados/menor"]: "Reuniones de Apoderados",
    [avisosPath + "/itinerario-jornada/listado-menores"]:
      "Itinerario de Jornada",
    [avisosPath + "/itinerario-jornada/menor"]: "Itinerario de Jornada",
    [avisosPath + "/vacunas/revisar-niveles-menores"]: "Vacunas",
    [avisosPath + "/vacunas/menores-por-nivel"]: "Vacunas",
    [avisosPath + "/vacunas/revisar-menor"]: "Vacunas",
    [avisosPath + "/paseos-visitas/revisar-listado-paseos"]: "Paseos y Visitas",
    [avisosPath + "/paseos-visitas/revisar-listado-niveles"]:
      "Paseos y Visitas",
    [avisosPath + "/paseos-visitas/revisar-listado-menores"]:
      "Paseos y Visitas",
    [avisosPath + "/paseos-visitas/revisar-menor"]: "Paseos y Visitas",
    [avisosPath + "/reuniones-apoderados/revisar-listado-reuniones"]:
      "Reunión de Apoderados",
    [avisosPath + "/reuniones-apoderados/revisar-listado-niveles"]:
      "Reunión de Apoderados",
    [avisosPath + "/reuniones-apoderados/revisar-listado-menores"]:
      "Reunión de Apoderados",
    [avisosPath + "/reuniones-apoderados/revisar-menor"]:
      "Reunión de Apoderados",
    [avisosPath + "/itinerario-jornada/revisar-listado-itinerario"]:
      "Itinerario de Jornada",
    [avisosPath + "/itinerario-jornada/revisar-listado-niveles"]:
      "Itinerario de Jornada",
    [avisosPath + "/itinerario-jornada/revisar-listado-menores"]:
      "Itinerario de Jornada",
    [avisosPath + "/itinerario-jornada/revisar-menor"]: "Itinerario de Jornada",
    [initPathName + "/comunicados"]: "Mensajes",
    [initPathName + "/comunicados/home"]: "Mensajes",
    [initPathName + "/comunicados/listado-comunicados"]: "Mensajes",
    [initPathName + "/comunicados/comunicado"]: "Mensajes",
    [initPathName + "/comunicados/crear-comunicado"]: "Mensajes",
  };

  const pathsWithOneParam: string[] = [
    avisosPath + "/vacunas/menor",
    avisosPath + "/vacunas/menores-por-nivel",
    avisosPath + "/paseos-visitas/revisar-listado-niveles",
    avisosPath + "/reuniones-apoderados/revisar-listado-niveles",
    avisosPath + "/itinerario-jornada/revisar-listado-niveles",
    initPathName + "/comunicados/listado-comunicados",
  ];

  const pathsWithTwoParams: string[] = [
    avisosPath + "/paseos-visitas/menor",
    avisosPath + "/reuniones-apoderados/menor",
    avisosPath + "/itinerario-jornada/menor",
    avisosPath + "/vacunas/revisar-menor",
    avisosPath + "/paseos-visitas/revisar-listado-menores",
    avisosPath + "/reuniones-apoderados/revisar-listado-menores",
    avisosPath + "/itinerario-jornada/revisar-listado-menores",
    initPathName + "/comunicados/comunicado",
  ];

  const pathsWithThreeParams: string[] = [
    avisosPath + "/paseos-visitas/revisar-menor",
    avisosPath + "/reuniones-apoderados/revisar-menor",
    avisosPath + "/itinerario-jornada/revisar-menor",
  ];

  const title: string =
    pageTitles[
      pathsWithOneParam.includes(
        location.pathname.split("/").slice(0, -1).join("/")
      )
        ? location.pathname.split("/").slice(0, -1).join("/")
        : pathsWithTwoParams.includes(
            location.pathname.split("/").slice(0, -2).join("/")
          )
        ? location.pathname.split("/").slice(0, -2).join("/")
        : pathsWithThreeParams.includes(
            location.pathname.split("/").slice(0, -3).join("/")
          )
        ? location.pathname.split("/").slice(0, -3).join("/")
        : location.pathname
    ] || "Libreta Digital";

  return (
    <Spin spinning={loadingLayout}>
      <div className="flex flex-col min-h-screen">
        <LibretaHeader title={title} />
        <main
          className={`flex-grow p-0 ${
            pathsQuitarHeader.includes(pathName) ? "pt-8" : "pt-[84px]"
          } pb-20`}
        >
          <Outlet />
        </main>
        <LibretaFooter />
      </div>
    </Spin>
  );
};

export default LibretaLayout;
