import { useNavigate } from "react-router-dom";
import AsistenciaEducadorHomePNG from "@/assets/asistencia-educador-home.png";
import { ObtenerInitPathName } from "@/common/FuncionesComunesUsuario";

const EducadorAsistenciaHome = () => {
  const initPathName: string = ObtenerInitPathName();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center bg-white">
      <div className="relative w-full h-[66vh] overflow-hidden mt-4">
        <div className="flex">
          <div className="flex-shrink-0 w-full flex flex-col items-center justify-center px-6 text-center">
            <h2 className="text-xl font-bold text-green-700 mb-4">
              ¡Revisa las Asistencias!
            </h2>
            <p className="text-gray-700">
              Aquí puedes registrar la <strong>Asistencias diaria</strong><br/>de los menores.
              <br />
              <br />
              Haz click en <strong>"Continuar"</strong> para
              <br />
              ingresar.
            </p>

            <div className="my-4 w-auto max-w-xs">
              <img
                style={{ objectFit: "contain" }}
                src={AsistenciaEducadorHomePNG}
                alt={"Imagen referencial de Mensajes"}
                className="w-full h-56 rounded-md"
              />
            </div>

            <div className="w-full flex justify-center">
              <button
                className="bg-figma-green text-white w-80 text-lg font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700"
                onClick={() => {
                  navigate(`${initPathName}/asistencia/listado-comunicados`);
                }}
              >
                Continuar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducadorAsistenciaHome;
