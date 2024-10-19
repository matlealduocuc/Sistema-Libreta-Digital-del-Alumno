import { NavLink } from "react-router-dom";
import {
  BulbOutlined,
  EditOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";

const LibretaHome = () => {
  const initPathName: string = "/libreta";
  return (
    <div className="p-4 max-w-md mx-auto">
      <NavLink
        to={initPathName + "/avisos"}
        className="block bg-gray-800 text-white rounded-lg p-6 mb-4 border border-gray-300 shadow-sm hover:bg-gray-100 transition"
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
        className="block bg-gray-800 text-white rounded-lg p-6 mb-4 border border-gray-300 shadow-sm hover:bg-gray-100 transition"
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
        className="block bg-gray-800 text-white rounded-lg p-6 mb-4 border border-gray-300 shadow-sm hover:bg-gray-100 transition"
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

export default LibretaHome;
