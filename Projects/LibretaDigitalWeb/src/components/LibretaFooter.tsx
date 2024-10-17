import {
  HomeOutlined,
  MessageOutlined,
  BellOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";

const LibretaFooter = () => {
  const initPathName: string = "/libreta";

  return (
    <footer className="fixed bottom-0 left-0 w-full bg-black p-4">
      <nav className="flex justify-around items-center max-w-md mx-auto">
        <NavLink
          to="/libreta/"
          className="text-white flex flex-col items-center"
        >
          <HomeOutlined className="text-2xl" />
          <span className="text-xs">Inicio</span>
        </NavLink>

        <NavLink
          to={initPathName + "/mensaje"}
          className="text-white flex flex-col items-center"
        >
          <MessageOutlined className="text-2xl" />
          <span className="text-xs">Mensaje</span>
        </NavLink>

        <NavLink
          to={initPathName + "/avisos"}
          className="text-white flex flex-col items-center"
        >
          <BellOutlined className="text-2xl" />
          <span className="text-xs">Avisos</span>
        </NavLink>

        <NavLink
          to={initPathName + "/perfil"}
          className="text-white flex flex-col items-center"
        >
          <UserOutlined className="text-2xl" />
          <span className="text-xs">Perfil</span>
        </NavLink>
      </nav>
    </footer>
  );
};

export default LibretaFooter;
