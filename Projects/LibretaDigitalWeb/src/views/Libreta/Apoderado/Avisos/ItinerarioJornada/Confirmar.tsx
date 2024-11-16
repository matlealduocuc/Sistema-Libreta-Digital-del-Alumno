import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ConfirmarItinerarioJornadaMenor = () => {
  const { id } = useParams();
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const menor = {
    nombre: "Antonella Ossio Soto",
    nivel: "Sala Cuna Mayor",
    actividad: "PINTACARITAS 11.11.2024",
    apoderado: "Lisette Soto Pedraza",
    estado: "ACTIVIDAD REALIZADA",
  };

  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      navigate("/apoderado");
    }
  };

  return (
    <div className="min-h-screen flex flex-col mt-9 w-full sm:px-32 md:px-40 lg:px-48 xl:px-56">
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
                <strong>Actividad:</strong> {menor.actividad}
              </p>
              <p>
                <strong>Apoderado:</strong> {menor.apoderado}
              </p>
              <p className="font-bold">
                <strong>Estado:</strong> {menor.estado}
              </p>
            </div>
            <button
              onClick={handleNextStep}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              Continuar
            </button>
          </div>
        )}

        {/* Paso 2: Confirmación para autorizar */}
        {step === 2 && (
          <div className="text-center">
            <h2 className="text-xl font-bold mb-4">¡Listo para Autorizar!</h2>
            <p className="mb-4">
              Haz click en <strong>"Aceptar"</strong>
              <br />
              para <strong>Confirmar tu Conocimiento</strong>
              <br />
              acerca de la asistencia del Menor.
            </p>
            <div className="border border-gray-300 rounded-lg p-4 mb-4 bg-white">
              <p className="text-center font-semibold">
                ¿Deseas confirmar que conoces la actividad realizada?
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
              Confirmación de Conocimiento
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
              Confirmación Autorizada
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

export default ConfirmarItinerarioJornadaMenor;
