import { useAuth } from "@/hooks/useAuth";
import {
  HomeOutlined,
  MessageOutlined,
  BellOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";

const LibretaFooter = () => {
  const { data, isLoading } = useAuth();
  let initPathName: string = "";
  let bgColorClass = "bg-black";
  let textColorClass = "text-white";
  if (!isLoading && data) {
    switch (data.rol) {
      case "apoderado":
        initPathName = "/apoderado";
        bgColorClass = "bg-blue-950";
        textColorClass = "text-white";
        break;
      case "educador":
        initPathName = "/educador";
        bgColorClass = "bg-green-700";
        textColorClass = "text-white";
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
              <HomeOutlined className="text-2xl" />
              <span className="text-xs">Inicio</span>
            </NavLink>

            <NavLink
              to={initPathName + "/mensaje"}
              className="flex flex-col items-center"
            >
              <MessageOutlined className="text-2xl" />
              <span className="text-xs">Mensaje</span>
            </NavLink>

            <NavLink
              to={initPathName + "/avisos"}
              className="flex flex-col items-center"
            >
              <BellOutlined className="text-2xl" />
              <span className="text-xs">Avisos</span>
            </NavLink>

            <NavLink
              to={initPathName + "/perfil"}
              className="flex flex-col items-center"
            >
              <UserOutlined className="text-2xl" />
              <span className="text-xs">Perfil</span>
            </NavLink>
          </nav>
        </footer>
      )}
    </div>
  );
};
export default LibretaFooter;
