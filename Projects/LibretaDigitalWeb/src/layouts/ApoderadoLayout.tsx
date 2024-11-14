import { Outlet, useLocation, useNavigate } from "react-router-dom";
import LibretaHeader from "@/components/LibretaHeader";
import LibretaFooter from "@/components/LibretaFooter";
import { AuthorizedUserDto } from "@/dtos/Auth/AuthorizedUserDto";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import React from "react";
import { Spin } from "antd";

const EducadorLayout = () => {
  const { data, isError, isLoading } = useAuth();
  const [loadingLayout, setLoadingLayout] = React.useState<boolean>(true);
  const storedUser = localStorage.getItem("AUTH_USER");
  const usuario: AuthorizedUserDto = storedUser ? JSON.parse(storedUser) : null;
  const location = useLocation();
  const navigate = useNavigate();

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
    if (isError) {
      return navigate("/login");
    }
  }, [isLoading, isError, navigate]);

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
    [initPathName + "/educador/comunicados"]: "Comunicados",
    [initPathName + "/educador/crear-comunicado"]: "Comunicados",
  };

  const title: string = pageTitles[location.pathname] || "Libreta Digital";

  return (
    <Spin spinning={loadingLayout}>
      <div className="flex flex-col min-h-screen">
        <LibretaHeader title={title} />
        <main className="flex-grow p-4 pt-16 pb-20">
          <Outlet />
        </main>
        <LibretaFooter />
      </div>
    </Spin>
  );
};

export default EducadorLayout;
