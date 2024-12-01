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
  const isHome = pathName == "";

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
        bgColorClass = "bg-figma-purple";
        textColorClass = "text-white";
        break;
      default:
        break;
    }
  }
  return (
    <header>
      <p className="fixed top-0 w-full z-10 text-md flex justify-center items-center bg-white">
        Libreta Digital Del Alumno
      </p>
      {pathsQuitarHeader.includes(pathName) ? null : (
        <div
          className={`fixed top-[24px] left-0 w-full z-10 ${bgColorClass} ${textColorClass} p-4 flex justify-between items-center`}
        >
          {isHome != false ? (
            <div></div>
          ) : (
            <ArrowLeftOutlined
              className="text-xl mr-4"
              onClick={() => navigate(-1)}
            />
          )}

          <h1 className="text-xl font-bold text-center">{title}</h1>
          <NavLink
            to={initPathName + "/perfil"}
            className="flex flex-col items-center"
          >
            <FontAwesomeIcon icon={faUser} color="white" size="lg" />
          </NavLink>
        </div>
      )}
    </header>
  );
};

export default LibretaHeader;
