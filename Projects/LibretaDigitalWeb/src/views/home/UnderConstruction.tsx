import UnderConstructionSignal from "@/assets/under-construction-signal.png";
import { ObtenerRolUser } from "@/common/FuncionesComunesUsuario";
import HomeIcon from "@/components/HomeIcon";
import { useNavigate } from "react-router-dom";

const UnderConstruction = () => {
  const navigate = useNavigate();
  const rol = ObtenerRolUser();
  let bgTitle = "bg-figma-blue";
  switch (rol) {
    case "apoderado":
      bgTitle = "bg-figma-blue";
      break;
    case "educador":
      bgTitle = "bg-figma-green";
      break;
    case "director":
      break;
    default:
      break;
  }

  return (
    <div className="flex flex-col items-center bg-white">
      <div
        className={`w-full py-3 flex items-center justify-center px-4 ${bgTitle} text-white`}
      >
        <h1 className="text-xl font-bold">¡Oops!</h1>
      </div>
      <div className="relative w-full h-[66vh] overflow-hidden mt-10">
        <div className="flex transition-transform duration-300 ease-in-out">
          <div
            className="flex-shrink-0 w-full flex flex-col items-center justify-center px-6 text-center"
            style={{ minWidth: "100%" }}
          >
            <h2 className="text-xl font-bold text-blue-600 mb-4">
              Página no encontrada
            </h2>
            <p className="text-gray-700">
              Parece ser que la <strong>Pagina</strong> que buscas
              <br />
              <strong>no está disponible</strong> o <strong>no existe</strong>
              .<br />
              Intenta voler más tarde.
            </p>

            <div className="my-6 w-auto max-w-xs">
              <img
                style={{ objectFit: "contain" }}
                src={UnderConstructionSignal}
                alt="Bajo Construcción y una mujer sosteniendo una sennaletica"
                className="w-full h-56 rounded-md"
              />
            </div>
            <div className="w-full flex justify-center">
              <button
                className="bg-figma-blue-button text-white w-80 text-lg font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700"
                onClick={() => {
                  navigate(-1);
                }}
              >
                Volver
              </button>
            </div>
            {rol && (
              <div className="w-full flex justify-center mt-3">
                <button
                  className="outline outline-1 outline-figma-blue-button text-figma-blue-button bg-white transition-colors w-80 text-lg font-semibold py-3 px-6 rounded-lg shadow-lg hover:outline-none hover:bg-figma-blue-button hover:text-white"
                  onClick={() => {
                    navigate("/libretaRedirect");
                  }}
                >
                  <HomeIcon color="blue" size="sm" className="pe-2" />
                  Inicio
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnderConstruction;
