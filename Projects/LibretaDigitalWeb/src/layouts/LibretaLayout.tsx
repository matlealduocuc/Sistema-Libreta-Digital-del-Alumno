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

  const pageTitles: { [key: string]: string } = {
    [initPathName]: bienvenidaText,
    [initPathName + "/"]: bienvenidaText,
    [initPathName + "/avisos"]: "Avisos",
    [initPathName + "/comunicate"]: "Comunícate",
    [initPathName + "/informate"]: "Infórmate",
    [initPathName + "/perfil"]: "Perfil del Usuario",
    [initPathName + "/avisos/home"]: "Avisos",
    [initPathName + "/avisos/vacunas/listado-menores"]: "Vacunas",
    [initPathName + "/avisos/vacunas/menor"]: "Vacunas",
    [initPathName + "/avisos/paseos-visitas/listado-menores"]:
      "Paseos y Visitas",
    [initPathName + "/avisos/paseos-visitas/menor"]: "Paseos y Visitas",
    [initPathName + "/avisos/reuniones-apoderados/listado-menores"]:
      "Reuniones de Apoderados",
    [initPathName + "/avisos/reuniones-apoderados/menor"]:
      "Reuniones de Apoderados",
    [initPathName + "/avisos/itinerario-jornada/listado-menores"]:
      "Itinerario de Jornada",
    [initPathName + "/avisos/itinerario-jornada/menor"]:
      "Itinerario de Jornada",
  };

  const pathsWithOneParam: string[] = [
    initPathName + "/avisos/vacunas/menor",
    initPathName + "/avisos/paseos-visitas/menor",
    initPathName + "/avisos/reuniones-apoderados/menor",
    initPathName + "/avisos/itinerario-jornada/menor",
  ];

  const title: string =
    pageTitles[
      pathsWithOneParam.includes(
        location.pathname.split("/").slice(0, -1).join("/")
      )
        ? location.pathname.split("/").slice(0, -1).join("/")
        : location.pathname
    ] || "Libreta Digital";

  return (
    <Spin spinning={loadingLayout}>
      <div className="flex flex-col min-h-screen">
        <LibretaHeader title={title} />
        <main
          className={`flex-grow p-0 ${
            pathsQuitarHeader.includes(pathName) ? "pt-8" : "pt-24"
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
