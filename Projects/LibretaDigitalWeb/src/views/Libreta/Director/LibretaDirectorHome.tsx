import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faLightbulb,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

const LibretaDirectorHome = () => {
  const initPathName: string = "/director";
  const itemsAppbar = [
    {
      icon: faBell,
      title: "Solicitudes",
      url: initPathName + "/avisos/home",
      parragraph: (
        <p className="text-sm text-center p-1">
          Envía{" "}
          <strong>
            Solicitudes Importantes a los
            <br />
            Apoderados
          </strong>{" "}
          para que las Autoricen.
        </p>
      ),
    },
    {
      icon: faPenToSquare,
      title: "Ingresos",
      url: initPathName + "/asistencia",
      parragraph: (
        <p className="text-sm text-center p-1">
          Ingresa <strong>Educadoras y Apoderados</strong>
          <br />
          para que utilicen el sistema.
        </p>
      ),
    },
    {
      icon: faLightbulb,
      title: "Mensajes",
      url: initPathName + "/comunicados",
      parragraph: (
        <p className="text-sm text-center p-1">
          Envía <strong>Mensajes y Documentos</strong>
          <br />
          relevantes a los Apoderados.
        </p>
      ),
    },
  ];

  function renderItemsAppbar() {
    return itemsAppbar.map((option, index) => {
      return (
        <Card
          key={index}
          className="bg-figma-purple-card text-white w-full shadow-xl rounded-2xl"
        >
          <NavLink to={option.url} className="hover:text-purple-400">
            <CardHeader>
              <div className="border-2 p-1 rounded-full">
                <FontAwesomeIcon
                  icon={option.icon}
                  color="white"
                  size="xl"
                  className="p-1 w-6"
                />
              </div>
              <p className="text-2xl font-medium text-center flex-grow mr-5">
                {option.title}
              </p>
            </CardHeader>
            <Divider className="bg-white" />
            <CardBody className="flex justify-center">
              {option.parragraph}
            </CardBody>
          </NavLink>
        </Card>
      );
    });
  }

  return (
    <div className="flex flex-row justify-center">
      <div className="flex flex-col px-4 py-8 items-center space-y-6 w-full max-w-md">
        {renderItemsAppbar()}
      </div>
    </div>
  );
};

export default LibretaDirectorHome;
