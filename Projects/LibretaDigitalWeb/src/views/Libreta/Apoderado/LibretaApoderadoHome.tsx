import { NavLink } from "react-router-dom";
import {
  BulbOutlined,
  EditOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { useAuth } from "@/hooks/useAuth";
// import { AuthorizedUserDto } from "@/dtos/Auth/AuthorizedUserDto";

// const storedUser = localStorage.getItem("AUTH_USER");
// const usuario: AuthorizedUserDto = storedUser ? JSON.parse(storedUser) : null;

// const designadoSexo: string =
//   usuario?.persona.sexo === "F"
//     ? "designada"
//     : usuario?.persona.sexo === "M"
//     ? "designado"
//     : "designad@";

const LibretaApoderadoHome = () => {
  const { data, isLoading } = useAuth();

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

  return (
    <div className="p-4 max-w-md mx-auto">
      <NavLink
        to={initPathName + "/avisos"}
        className="block bg-gray-800 hover:bg-gray-700 text-white rounded-lg p-6 mb-4 border border-gray-300 shadow-sm transition"
      >
        <div className="flex items-center">
          <BulbOutlined className="text-2xl mr-4 text-white" />
          <div>
            <h2 className="text-lg font-bold">Avisos</h2>
            <p className="text-sm">
              Infórmate de los Avisos Importantes y autoriza solicitudes.
            </p>
          </div>
        </div>
      </NavLink>
      <NavLink
        to={initPathName + "/comunicate"}
        className="block bg-gray-800 hover:bg-gray-700 text-white rounded-lg p-6 mb-4 border border-gray-300 shadow-sm transition"
      >
        <div className="flex items-center">
          <EditOutlined className="text-2xl mr-4 text-white" />
          <div>
            <h2 className="text-lg font-bold">Comunícate</h2>
            <p className="text-sm">
              Comunícate directamente con la Educadora de Párvulo designada.
            </p>
          </div>
        </div>
      </NavLink>

      <NavLink
        to={initPathName + "/informate"}
        className="block bg-gray-800 hover:bg-gray-700 text-white rounded-lg p-6 mb-4 border border-gray-300 shadow-sm transition"
      >
        <div className="flex items-center">
          <InfoCircleOutlined className="text-2xl mr-4 text-white" />
          <div>
            <h2 className="text-lg font-bold">Infórmate</h2>
            <p className="text-sm">
              Revisa los Protocolos que rigen nuestra institución.
            </p>
          </div>
        </div>
      </NavLink>
    </div>
  );
};

export default LibretaApoderadoHome;