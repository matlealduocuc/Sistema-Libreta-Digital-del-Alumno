import { ObtenerInitPathName } from "@/common/FuncionesComunesUsuario";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const SolicitarVacunas = () => {
  const { id } = useParams();
  console.log(id);
  const [step, setStep] = useState(1);
  const initPathName = ObtenerInitPathName();
  const navigate = useNavigate();

  const nivelVacuna = {
    nombre: "Sala Cuna Mayor",
    vacuna: "Influenza 11.11.2024",
    cantidadMenores: "47",
    enviada: false,
  };

  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      navigate(initPathName);
    }
  };

  return (
    <div className="min-h-screen flex flex-col w-full sm:px-32 md:px-40 lg:px-48 xl:px-56">
      <main className="flex-1 px-4 py-2">
        {/* Paso 1 */}
        {step === 1 && (
          <div className="text-center">
            <h2 className="text-xl font-bold mb-4">
              Solicitud de Autorización
            </h2>
            <p className="mb-4">
              Haz click en <strong>“Continuar”</strong>
              <br />
              para solicitar la Autorización
              <br />
              de <strong>Vacuna contra la Influenza</strong>.
            </p>
            <div className="border border-gray-300 rounded-lg p-4 mb-4 bg-white">
              <p>
                <strong>Nivel:</strong> {nivelVacuna.nombre}
              </p>
              <p>
                <strong>Vacuna:</strong> {nivelVacuna.vacuna}
              </p>
              <p>
                <strong>Cantidad de Menores:</strong>{" "}
                {nivelVacuna.cantidadMenores}
              </p>
              {nivelVacuna.enviada ? (
                <p className="font-bold text-red-600">
                  <strong>Estado:</strong> AUTORIZACIÓN ENVIADA
                </p>
              ) : (
                <p className="font-bold text-red-600">
                  <strong>Estado:</strong> AUTORIZACIÓN NO ENVIADA
                </p>
              )}
            </div>
            <button
              onClick={handleNextStep}
              className="w-full bg-figma-blue-button text-white py-2 rounded-lg hover:bg-blue-700"
            >
              Continuar
            </button>
          </div>
        )}

        {/* Paso 2 */}
        {step === 2 && (
          <div className="text-center">
            <h2 className="text-xl font-bold mb-4">¡Listo para Solicitar!</h2>
            <p className="mb-4">
              Haz click en <strong>"Aceptar"</strong>
              <br />
              para Solicitar Autorización de Vacuna.
            </p>
            <div className="border border-gray-300 rounded-lg p-4 mb-4 bg-white">
              <p className="text-center font-semibold">
                ¿Solicitar autorización el suministro
                <br />
                de la vacuna indicada?
              </p>
            </div>
            <button
              onClick={handleNextStep}
              className="w-full bg-figma-blue-button text-white py-2 rounded-lg hover:bg-blue-700"
            >
              Aceptar
            </button>
          </div>
        )}

        {/* Paso 3 */}
        {step === 3 && (
          <div className="flex flex-col items-center text-center">
            <h2 className="text-xl font-bold mb-4">
              Confirmación de
              <br />
              Solicitud de Autorización
            </h2>
            <div className="flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-20 w-20 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <p className="text-green-600 font-bold text-lg mb-4 text-center">
              Solicitud
              <br />
              Confirmada
            </p>
            <button
              onClick={handleNextStep}
              className="w-full bg-figma-blue-button text-white py-2 rounded-lg hover:bg-blue-700"
            >
              Aceptar
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default SolicitarVacunas;
