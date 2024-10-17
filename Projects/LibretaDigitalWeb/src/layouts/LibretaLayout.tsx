import { Outlet, useLocation } from "react-router-dom";
import LibretaHeader from "@/components/LibretaHeader";
import LibretaFooter from "@/components/LibretaFooter";
import { AuthorizedUserDto } from "@/dtos/Auth/AuthorizedUserDto";

const LibretaLayout = () => {
  const storedUser = localStorage.getItem("AUTH_USER");
  const usuario: AuthorizedUserDto = storedUser ? JSON.parse(storedUser) : null;
  const location = useLocation();

  const initPathName: string = "/libreta";

  const pageTitles: { [key: string]: string } = {
    [initPathName]: "Bienvenido " + usuario.persona.primerNombre.toUpperCase(),
    [initPathName + "/"]:
      "Bienvenido " + usuario.persona.primerNombre.toUpperCase(),
    [initPathName + "/avisos"]: "Avisos",
    [initPathName + "/comunicate"]: "Comunícate",
    [initPathName + "/informate"]: "Infórmate",
    [initPathName + "/perfil"]: "Perfil del Usuario",
  };

  const title: string = pageTitles[location.pathname] || "Libreta Digital";

  return (
    <div className="flex flex-col min-h-screen">
      <LibretaHeader title={title} />
      <main className="flex-grow p-4 pt-16 pb-20">
        <Outlet />
      </main>
      <LibretaFooter />
    </div>
  );
};

export default LibretaLayout;
