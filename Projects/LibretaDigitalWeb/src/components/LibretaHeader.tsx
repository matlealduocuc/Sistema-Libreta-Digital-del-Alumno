import { ObtenerInitPathName } from "@/common/FuncionesComunesUsuario";
import { useAuth } from "@/hooks/useAuth";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink, useNavigate } from "react-router-dom";

interface LibretaHeaderProps {
  title: string;
}

const LibretaHeader: React.FC<LibretaHeaderProps> = ({ title }) => {
  const { data, isLoading } = useAuth();
  const navigate = useNavigate();
  const pathName = location.pathname
    .split("/")
    ?.splice(2, 2)
    .join("/")
    .toLowerCase();
  const pathsQuitarHeader = ["avisos/home"];
  const initPathName = ObtenerInitPathName();

  let bgColorClass = "bg-black";
  let textColorClass = "text-white";
  if (!isLoading && data) {
    switch (data.rol) {
      case "apoderado":
        bgColorClass = "bg-figma-blue";
        textColorClass = "text-white";
        break;
      case "educador":
        bgColorClass = "bg-figma-green";
        textColorClass = "text-white";
        break;
      case "director":
        break;
      default:
        break;
    }
  }
  return (
    <header>
      <p className="fixed top-0 w-full z-10 text-md flex justify-center items-center">
        Libreta Digital Del Alumno
      </p>
      {pathsQuitarHeader.includes(pathName) ? null : (
        <div
          className={`fixed top-7 left-0 w-full z-10 ${bgColorClass} ${textColorClass} p-4 flex justify-between items-center`}
        >
          <ArrowLeftOutlined
            className="text-xl mr-4"
            onClick={() => navigate(-1)}
          />
          <h1 className="text-xl font-bold">{title}</h1>
          <NavLink
            to={initPathName + "/perfil"}
            className="flex flex-col items-center"
          >
            <FontAwesomeIcon
              icon={faUser}
              color="white"
              size="lg"
              className="p-1 w-6"
            />
          </NavLink>
        </div>
      )}
    </header>
  );
};

export default LibretaHeader;
