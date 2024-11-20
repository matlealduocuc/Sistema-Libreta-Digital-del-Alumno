import { MenorController } from "@/controllers/MenorController";
import { useAuth } from "@/hooks/useAuth";
import { Spin } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const AutorizarVacunaMenor = () => {
  const { id } = useParams();
  const { isLoading } = useAuth();
  const [menor, setMenor] = useState<{
    idMenor: number;
    nombreMenor: string;
    nivel: string;
    nombreVacuna: string;
    idVacuna: number;
    nombreApoderado: string;
    autorizado: boolean | null;
  }>();
  const [loading, setLoading] = useState<boolean>(true);
  const [isErrorAutorizar, setIsErrorAutorizar] = useState<boolean>(true);
  const [step, setStep] = useState(1);
  const menorController = new MenorController();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMenor = async () => {
      setLoading(true);
      if (!isLoading && id) {
        try {
          const menorData =
            await menorController.getMenorVacunasByMenorAndApoderado(+id);
          if (menorData) {
            setMenor(menorData);
          }
        } catch (error) {
          console.error("Error fetching menores:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchMenor();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, id]);

  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      navigate("/apoderado");
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigate(-1);
    }
  };

  const handleAutorizarVacuna = async (idVacuna: number | undefined) => {
    try {
      setLoading(true);
      if (id && idVacuna) {
        const isOk = await menorController.autorizarVacunaMenor(+id, idVacuna);
        setIsErrorAutorizar(!isOk);
      } else {
        setIsErrorAutorizar(true);
        setStep(3);
      }
    } catch (error) {
      console.error("Error autorizando vacuna:", error);
      setIsErrorAutorizar(true);
    } finally {
      setStep(3);
      setLoading(false);
    }
  };

  return (
    <Spin spinning={loading}>
      <div className="flex flex-col mt-9 w-full sm:px-32 md:px-40 lg:px-48 xl:px-56">
        <main className="flex-1 p-4">
          {/* Paso 1: Estado de Autorización */}
          {step === 1 && (
            <div className="text-center space-y-6">
              <h2 className="text-xl font-bold mb-4">Estado de Autorización</h2>
              <p className="mb-4">
                En el recuadro se indica el nombre del menor,
                <br />
                la <strong>Vacuna Pendiente</strong>
                <br />y su <strong>Estado de Autorización</strong>.
              </p>
              <p className="mb-4">
                Haz click en <strong>"Autorizar"</strong>
                <br /> para permitir la aplicación de la vacuna.
              </p>
              <div className="border border-gray-300 rounded-lg p-4 mb-4 bg-white">
                <p>
                  <strong>Menor:</strong> {menor?.nombreMenor}
                </p>
                <p>
                  <strong>Nivel:</strong> {menor?.nivel}
                </p>
                <p>
                  <strong>Vacuna:</strong> {menor?.nombreVacuna}
                </p>
                <p>
                  <strong>Apoderado:</strong> {menor?.nombreApoderado}
                </p>
                {menor?.autorizado ? (
                  <p className="font-bold text-blue-600">
                    <strong>Estado: Vacuna Autorizada</strong>
                  </p>
                ) : menor?.autorizado != null && !menor?.autorizado ? (
                  <p className="font-bold text-red-600">
                    <strong>Estado: Vacuna No Autorizada</strong>
                  </p>
                ) : (
                  <p className="font-bold text-gray-600">
                    <strong>Estado: Vacuna no solicitada</strong>
                  </p>
                )}
              </div>
              {menor?.autorizado != null && !menor?.autorizado ? (
                <button
                  onClick={handleNextStep}
                  className="w-full bg-figma-blue-button text-white py-2 rounded-lg hover:bg-blue-700"
                >
                  Continuar
                </button>
              ) : (
                <button
                  onClick={handlePrevStep}
                  className="w-full outline outline-1 outline-figma-blue-button text-figma-blue-button bg-white transition-colors py-2 mt-4 font-semibold rounded-lg hover:outline-none hover:bg-figma-blue-button hover:text-white"
                >
                  Volver
                </button>
              )}
              <p className="text-black text-md text-center mt-4">
                Haz{" "}
                <a
                  className="underline cursor-pointer font-bold"
                  target="_blank"
                  href="https://saludresponde.minsal.cl/vacunacion-contra-la-influenza-2024/"
                >
                  Click Aquí
                </a>{" "}
                para ver las recomendaciones del Ministerio de Salud.
              </p>
            </div>
          )}

          {/* Paso 2: Confirmación para autorizar */}
          {step === 2 && (
            <div className="text-center">
              <h2 className="text-xl font-bold mb-4">¡Listo para Autorizar!</h2>
              <p className="mb-4">
                Haz click en <strong>"Aceptar"</strong> para autorizar la
                vacuna.
              </p>
              <div className="border border-gray-300 rounded-lg p-4 mb-4 bg-white">
                <p className="text-center font-semibold">
                  ¿Autoriza el suministro de la vacuna indicada?
                </p>
              </div>
              <button
                onClick={() => handleAutorizarVacuna(menor?.idVacuna)}
                className="w-full bg-figma-blue-button text-white py-2 font-semibold rounded-lg hover:bg-blue-700"
              >
                Aceptar
              </button>
              <button
                onClick={() => handlePrevStep()}
                className="w-full outline outline-1 outline-figma-blue-button text-figma-blue-button bg-white transition-colors py-2 mt-4 font-semibold rounded-lg hover:outline-none hover:bg-figma-blue-button hover:text-white"
              >
                Volver
              </button>
            </div>
          )}

          {/* Paso 3: Confirmación de autorización */}
          {step === 3 && (
            <div className="flex flex-col items-center">
              <h2 className="text-xl font-bold mb-4">
                Confirmación de Autorización
              </h2>
              {isErrorAutorizar ? (
                <div>
                  <div className="flex items-center justify-center mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-20 w-20 text-red-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="11"
                        stroke="currentColor"
                        strokeWidth={2}
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8 16L16 8M8 8l8 8"
                      />
                    </svg>
                  </div>
                  <p className="text-red-500 font-bold text-lg mb-4 text-center">
                    Error al
                    <br />
                    Autorizar
                  </p>
                </div>
              ) : (
                <div>
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
                    Vacuna
                    <br />
                    Autorizada
                  </p>
                </div>
              )}

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
    </Spin>
  );
};

export default AutorizarVacunaMenor;
