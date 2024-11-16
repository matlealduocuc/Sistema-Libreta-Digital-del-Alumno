import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const AutorizarVacunaMenor = () => {
  const { id } = useParams();
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const menor = {
    nombre: "Antonella Ossio Soto",
    nivel: "Sala Cuna Mayor",
    vacuna: "Sarampión 11.11.2024",
    apoderado: "Lisette Soto Pedraza",
    estado: "VACUNA NO AUTORIZADA",
  };

  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      navigate("/apoderado");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 mt-9">
      <main className="flex-1 p-4">
        {/* Paso 1: Estado de Autorización */}
        {step === 1 && (
          <div className="text-center space-y-6">
            <h2 className="text-xl font-bold mb-4">Estado de Autorización</h2>
            <p className="mb-4">
              En el recuadro se indica el nombre del menor, la vacuna pendiente
              y su estado de autorización.
            </p>
            <p className="mb-4">
              Haz click en <strong>"Autorizar"</strong> para permitir la
              aplicación de la vacuna.
            </p>
            <div className="border border-gray-300 rounded-lg p-4 mb-4 bg-white">
              <p>
                <strong>Menor:</strong> {menor.nombre}
              </p>
              <p>
                <strong>Nivel:</strong> {menor.nivel}
              </p>
              <p>
                <strong>Vacuna:</strong> {menor.vacuna}
              </p>
              <p>
                <strong>Apoderado:</strong> {menor.apoderado}
              </p>
              <p className="font-bold text-red-600">
                <strong>Estado:</strong> {menor.estado}
              </p>
            </div>
            <button
              onClick={handleNextStep}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              Continuar
            </button>
            <p className="text-black text-md text-center mt-4">
              Haz <a className="underline cursor-pointer font-bold">Click Aquí</a>{" "}
              para ver las recomendaciones del Ministerio de Salud.
            </p>
          </div>
        )}

        {/* Paso 2: Confirmación para autorizar */}
        {step === 2 && (
          <div>
            <h2 className="text-xl font-bold mb-4">¡Listo para Autorizar!</h2>
            <p className="mb-4">
              Haz click en <strong>"Aceptar"</strong> para autorizar la vacuna.
            </p>
            <div className="border border-gray-300 rounded-lg p-4 mb-4 bg-white">
              <p className="text-center font-semibold">
                ¿Autoriza el suministro de la vacuna indicada?
              </p>
            </div>
            <button
              onClick={handleNextStep}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              Aceptar
            </button>
          </div>
        )}

        {/* Paso 3: Confirmación de autorización */}
        {step === 3 && (
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-bold mb-4">
              Confirmación de Autorización
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
            <p className="text-green-600 font-bold text-lg mb-4">
              Vacuna Autorizada
            </p>
            <button
              onClick={handleNextStep}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              Aceptar
            </button>
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-gray-300 p-4 flex justify-around">
        <button className="text-blue-600">Inicio</button>
        <button className="text-blue-600">Avisos</button>
        <button className="text-blue-600">Mensaje</button>
        <button className="text-blue-600">Info</button>
      </footer>
    </div>
  );
};

export default AutorizarVacunaMenor;
