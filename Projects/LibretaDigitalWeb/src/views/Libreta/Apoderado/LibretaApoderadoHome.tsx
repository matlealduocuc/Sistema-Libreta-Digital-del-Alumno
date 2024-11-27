import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faCalendar,
  faLightbulb,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

const LibretaApoderadoHome = () => {
  const initPathName: string = "/apoderado";
  const itemsAppbar = [
    {
      icon: faBell,
      title: "Autoriza",
      url: initPathName + "/avisos/home",
      parragraph: (
        <p className="text-sm text-center p-1">
          Accede a <strong>Información Importante</strong>
          <br />y <strong>Autoriza Solicitudes</strong>.
        </p>
      ),
    },
    {
      icon: faCalendar,
      title: "Asistencia",
      url: initPathName + "/asistencia",
      parragraph: (
        <p className="text-sm text-center p-1">
          Revisa aquí la
          <br />
          <strong>Asistencia del Menor</strong>.
        </p>
      ),
    },
    {
      icon: faLightbulb,
      title: "Mensajes",
      url: initPathName + "/comunicados/home",
      parragraph: (
        <p className="text-sm text-center p-1">
          Accede a los <strong>Comunicados</strong>
          <br />
          enviados por la institución.
        </p>
      ),
    },
  ];

  function renderItemsAppbar() {
    return itemsAppbar.map((option, index) => {
      return (
        <Card
          key={index}
          className="bg-figma-blue-card text-white w-full shadow-xl rounded-2xl"
        >
          <NavLink to={option.url}>
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
      <div className="flex flex-col px-4 py-4 items-center space-y-4 w-full max-w-md">
        {renderItemsAppbar()}
      </div>
    </div>
  );
};

export default LibretaApoderadoHome;
