import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faCalendar,
  faLightbulb,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

const LibretaEducadorHome = () => {
  const initPathName: string = "/educador";
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
      icon: faCalendar,
      title: "Asistencia",
      url: initPathName + "/asistencia",
      parragraph: (
        <p className="text-sm text-center p-1">
          <strong>Registra la Asistencia</strong> de
          <br />
          los menores.
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
          className="bg-figma-green-card text-white w-full shadow-xl rounded-2xl"
        >
          <NavLink to={option.url} className="hover:text-green-500">
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

export default LibretaEducadorHome;
