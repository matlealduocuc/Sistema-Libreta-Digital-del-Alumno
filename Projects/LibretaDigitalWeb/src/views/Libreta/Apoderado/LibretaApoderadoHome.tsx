// import { NavLink } from "react-router-dom";
// import {
//   BulbOutlined,
//   EditOutlined,
//   InfoCircleOutlined,
// } from "@ant-design/icons";
// import { Card } from "antd";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faCalendar,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
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
  // const initPathName: string = "/apoderado";

  const itemsAppbar = [
    {
      icon: faBell,
      title: "Avisos",
      url: "/apoderado/avisos/home",
      parragraph: (
        <p className="text-sm text-center p-1">
          Informate de los <strong>Avisos Importantes</strong>
          <br />y <strong>Autoriza Solicitudes</strong>.
        </p>
      ),
    },
    {
      icon: faCalendar,
      title: "Asistencia",
      url: "/apoderado/asistencia",
      parragraph: (
        <p className="text-sm text-center p-1">
          Revisa aquí la <br /> <strong>Asistencia del Menor</strong>.
        </p>
      ),
    },
    {
      icon: faInfoCircle,
      title: "Circulares",
      url: "/apoderado/comunicados",
      parragraph: (
        <p className="text-sm text-center p-1">
          Accede a los <strong>Comunicados</strong> <br />
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
          className="bg-blue-800 text-white w-full shadow-xl rounded-2xl"
        >
          <NavLink to={option.url}>
            <CardHeader>
              <div className="border-2 p-1 rounded-full">
                <FontAwesomeIcon
                  icon={option.icon}
                  color="white"
                  size="xl"
                  className="p-1"
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
    <div className="flex flex-col px-4 py-8 items-center space-y-6 w-full max-w-md">
      {renderItemsAppbar()}
    </div>
  );

  // return (
  //   <div className="p-4 max-w-md mx-auto">
  //     <Card key={index} className="bg-primary text-white w-full shadow-xl">
  //         <CardHeader>
  //           <div className="border-1 rounded-full">
  //             <FontAwesomeIcon
  //               icon={option.icon}
  //               color="white"
  //               size="lg"
  //               className="p-1"
  //             />
  //           </div>
  //           <p className="text-2xl font-medium text-center flex-grow mr-5">
  //             {option.title}
  //           </p>
  //         </CardHeader>
  //         <Divider className="bg-white" />
  //         <CardBody className="flex justify-center">
  //           {option.parragraph}
  //         </CardBody>
  //       </Card>
  //     <NavLink
  //       to={initPathName + "/comunicate"}
  //       className="block bg-gray-800 hover:bg-gray-700 text-white rounded-lg p-6 mb-4 border border-gray-300 shadow-sm transition"
  //     >
  //       <div className="flex items-center">
  //         <EditOutlined className="text-2xl mr-4 text-white" />
  //         <div>
  //           <h2 className="text-lg font-bold">Comunícate</h2>
  //           <p className="text-sm">
  //             Comunícate directamente con la Educadora de Párvulo designada.
  //           </p>
  //         </div>
  //       </div>
  //     </NavLink>

  //     <NavLink
  //       to={initPathName + "/informate"}
  //       className="block bg-gray-800 hover:bg-gray-700 text-white rounded-lg p-6 mb-4 border border-gray-300 shadow-sm transition"
  //     >
  //       <div className="flex items-center">
  //         <InfoCircleOutlined className="text-2xl mr-4 text-white" />
  //         <div>
  //           <h2 className="text-lg font-bold">Infórmate</h2>
  //           <p className="text-sm">
  //             Revisa los Protocolos que rigen nuestra institución.
  //           </p>
  //         </div>
  //       </div>
  //     </NavLink>
  //   </div>
  // );
};

export default LibretaApoderadoHome;
