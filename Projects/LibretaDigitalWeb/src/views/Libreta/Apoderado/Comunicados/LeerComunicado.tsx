import { ComunicadoController } from "@/controllers/ComunicadoController";
import { useAuth } from "@/hooks/useAuth";
import { Spin } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const LeerComunicado = () => {
  const { idMenor, idComunicado } = useParams<{
    idMenor: string;
    idComunicado: string;
  }>();
  const { isLoading } = useAuth();
  const [comunicado, setComunicado] = useState<{
    de: string;
    rol: string;
    nivel: string;
    fechaComunicado: string;
    titulo: string;
    confirmado: boolean | null;
    detalle: string;
  }>();
  const [loading, setLoading] = useState<boolean>(true);
  const [isErrorConfirmar, setIsErrorConfirmar] = useState<boolean>(true);
  const [step, setStep] = useState(1);
  const comunicadoController = new ComunicadoController();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMenor = async () => {
      setLoading(true);
      if (!isLoading && idMenor && idComunicado) {
        try {
          const comunicadoData =
            await comunicadoController.getComunicadoByMenorComunicado(
              +idMenor,
              +idComunicado
            );
          if (comunicadoData) {
            setComunicado(comunicadoData);
          }
        } catch (error) {
          console.error("Error fetching comunicado:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchMenor();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, idMenor, idComunicado]);

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

  const handleConfirmarConocimiento = async () => {
    try {
      setLoading(true);
      if (idMenor && idComunicado) {
        const isOk =
          await comunicadoController.confirmaConocimientoComunicadoMenor(
            +idMenor,
            +idComunicado
          );
        setIsErrorConfirmar(!isOk);
      } else {
        setIsErrorConfirmar(true);
        setStep(3);
      }
    } catch (error) {
      console.error("Error confirmando conocimiento:", error);
      setIsErrorConfirmar(true);
    } finally {
      setStep(3);
      setLoading(false);
    }
  };

  return (
    <Spin spinning={loading}>
      <div className="flex flex-col w-full sm:px-32 md:px-40 lg:px-48 xl:px-56">
        <main className="flex-1 px-4 py-2">
          {/* Paso 1 */}
          {step === 1 && (
            <div className="text-center space-y-2">
              <h2 className="text-xl font-bold mb-2">Detalle del Mensaje</h2>
              <p className="text-sm">
                Revisa el detalle del mensaje y
                <br />
                haz click en <strong>"Aceptar"</strong> para confirmar lectura.
              </p>
              <div className="border border-gray-300 rounded-lg px-4 py-2 mb-4 bg-white">
                <p>
                  <strong>De:</strong> {comunicado?.de}
                </p>
                <p>
                  <strong>Cargo:</strong> {comunicado?.rol}
                </p>
                <p>
                  <strong>Nivel:</strong> {comunicado?.nivel}
                </p>
                <p>
                  <strong>Enviado:</strong>{" "}
                  {comunicado?.fechaComunicado.split(".").join("-")}
                </p>
                <p>
                  <strong>Asunto:</strong> {comunicado?.titulo}
                </p>
                {comunicado?.confirmado ? (
                  <p className="font-bold text-green-700">
                    <strong>Estado: Conocimiento confirmado</strong>
                  </p>
                ) : comunicado?.confirmado != null &&
                  !comunicado?.confirmado ? (
                  <p className="font-bold text-red-600">
                    <strong>Estado: Conocimiento no confirmado</strong>
                  </p>
                ) : (
                  <p className="font-bold text-gray-600">
                    <strong>Estado: Conocimiento no solicitado</strong>
                  </p>
                )}
              </div>
              <div className="border border-gray-300 rounded-lg px-4 py-2 mb-4 bg-white">
                <p>
                  <strong>Mensaje:</strong>
                </p>
                <p
                  dangerouslySetInnerHTML={{
                    __html: comunicado?.detalle ?? "",
                  }}
                ></p>
              </div>
              {comunicado?.confirmado != null && !comunicado?.confirmado ? (
                <button
                  onClick={handleNextStep}
                  className="w-full bg-figma-blue-button text-white py-2 rounded-lg hover:bg-blue-700"
                >
                  Aceptar
                </button>
              ) : (
                <button
                  onClick={handlePrevStep}
                  className="w-full outline outline-1 outline-figma-blue-button text-figma-blue-button bg-white transition-colors py-2 mt-4 font-semibold rounded-lg hover:outline-none hover:bg-figma-blue-button hover:text-white"
                >
                  Volver
                </button>
              )}
            </div>
          )}

          {/* Paso 2: Confirmación para autorizar */}
          {step === 2 && (
            <div className="text-center">
              <h2 className="text-xl font-bold mb-4">
                ¡Confirma tu Conocimiento!
              </h2>
              <p className="mb-4">
                Haz click en <strong>"Aceptar"</strong>
                <br />
                para <strong>Confirmar tu Conocimiento</strong>.
              </p>
              <div className="border border-gray-300 rounded-lg p-4 mb-4 bg-white">
                <p className="text-center font-semibold">
                  ¿Deseas confirmar tu conocimiento?
                </p>
              </div>
              <button
                onClick={() => handleConfirmarConocimiento()}
                className="w-full bg-figma-blue-button text-white py-2 rounded-lg hover:bg-blue-700"
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
                Confirmación de Conocimiento
              </h2>
              {isErrorConfirmar ? (
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
                    Conocimiento
                    <br />
                    Confirmado
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

export default LeerComunicado;
