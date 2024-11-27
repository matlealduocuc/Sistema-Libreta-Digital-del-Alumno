import { useNavigate } from "react-router-dom";
import MensajesPNG from "@/assets/mensajes.png";

const ApoderadoComunicadosHome = () => {
  const initPathName: string = "/apoderado";
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center bg-white">
      <div className="relative w-full h-[66vh] overflow-hidden mt-4">
        <div className="flex">
          <div className="flex-shrink-0 w-full flex flex-col items-center justify-center px-6 text-center">
            <h2 className="text-xl font-bold text-blue-600 mb-4">
              ¡Revisa tus Mensajes!
            </h2>
            <p className="text-gray-700">
              Aquí puedes ver los <strong>Comunicados Recibidos</strong>.<br />
              <br />
              Haz click en <strong>"Revisar"</strong> para
              <br />
              filtrar tus mensajes según menor.
            </p>

            <div className="my-4 w-auto max-w-xs">
              <img
                style={{ objectFit: "contain" }}
                src={MensajesPNG}
                alt={"Imagen referencial de Mensajes"}
                className="w-full h-56 rounded-md"
              />
            </div>

            <div className="w-full flex justify-center">
              <button
                className="bg-figma-blue-button text-white w-80 text-lg font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700"
                onClick={() => {
                  navigate(`${initPathName}/comunicados/listado-comunicados`);
                }}
              >
                Revisar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApoderadoComunicadosHome;
