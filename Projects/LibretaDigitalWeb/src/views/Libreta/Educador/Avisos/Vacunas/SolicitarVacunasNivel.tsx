import { ObtenerInitPathName } from "@/common/FuncionesComunesUsuario";
import { VacunaController } from "@/controllers/VacunaController";
import { useAuth } from "@/hooks/useAuth";
import { Spin } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const SolicitarVacunasNivel = () => {
  const { idNivel } = useParams();
  const { isLoading } = useAuth();
  const initPathName = ObtenerInitPathName();
  const [nivel, setNivel] = useState<{
    idVacuna: number;
    nivel: string;
    nombreVacuna: string;
    nmroMenores: number;
    nmroSolicitados: number;
    nmroNoSolicitados: number;
    fechaVacuna: string;
    solicitado: boolean | null;
  }>();
  const [loading, setLoading] = useState<boolean>(true);
  const [isErrorAutorizar, setIsErrorAutorizar] = useState<boolean>(true);
  const [step, setStep] = useState(1);
  const [nombVacuna, setNombVacuna] = useState("Influenza");
  const [fechVacuna, setFechVacuna] = useState("");
  const vacunaController = new VacunaController();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNivel = async () => {
      setLoading(true);
      if (!isLoading && idNivel) {
        try {
          const nivelData = await vacunaController.getNivelVacunaByNivel(
            +idNivel
          );
          if (nivelData) {
            setNivel(nivelData);
          }
        } catch (error) {
          console.error("Error fetching nivel:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchNivel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, idNivel]);

  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      navigate(initPathName);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigate(-1);
    }
  };

  const handleSolicitarVacuna = async (idVacuna: number | undefined) => {
    try {
      setLoading(true);
      if (idNivel) {
        let isOk = false;
        if (nivel?.solicitado) {
          if (idVacuna) {
            isOk = await vacunaController.solicitarVacunaMenoresNivel(
              +idNivel,
              idVacuna
            );
          }
        } else {
          if (nombVacuna && fechVacuna) {
            isOk = await vacunaController.solicitarVacunaNivel(
              +idNivel,
              nombVacuna,
              new Date(fechVacuna)
            );
          }
        }
        setIsErrorAutorizar(!isOk);
      } else {
        setIsErrorAutorizar(true);
        setStep(3);
      }
    } catch (error) {
      console.error("Error solicitando vacunas:", error);
      setIsErrorAutorizar(true);
    } finally {
      setStep(3);
      setLoading(false);
    }
  };

  return (
    <Spin spinning={loading}>
      <div className="flex flex-col w-full sm:px-32 md:px-40 lg:px-48 xl:px-56">
        <main className="flex-1 px-4 py-2">
          {/* Paso 1: Estado de Autorización */}
          {step === 1 && (
            <div className="text-center space-y-2">
              <h2 className="text-xl font-bold mb-2">Estado de Autorización</h2>
              <p className="mb-4">
                En el recuadro se indica el nombre del menor,
                <br />
                la <strong>Vacuna Pendiente</strong>
                <br />y su <strong>Estado de Autorización</strong>.
              </p>
              <p className="mb-2">
                Haz click en <strong>"Autorizar"</strong>
                <br /> para permitir la aplicación de la vacuna.
              </p>
              <div className="border border-gray-300 rounded-lg p-4 mb-2 bg-white">
                <p>
                  <strong>Nivel:</strong> {nivel?.nivel}
                </p>
                <p>
                  <strong>Numero menores:</strong> {nivel?.nmroMenores}
                </p>
                <p>
                  <strong>Vacuna:</strong>{" "}
                  {nivel?.nombreVacuna ?? "No Definida"}
                </p>
                <p>
                  <strong>Fecha:</strong>{" "}
                  {nivel?.fechaVacuna != null
                    ? nivel?.fechaVacuna.split(".").join("-").split(" ")[0]
                    : "No Definida"}
                </p>
                <p>
                  <strong>Menores Solicitados:</strong> {nivel?.nmroSolicitados}
                </p>
                <p>
                  <strong>Menores NO Solicitados:</strong>{" "}
                  {nivel?.nmroNoSolicitados}
                </p>
                {nivel?.solicitado ? (
                  <p className="font-bold text-green-700">
                    <strong>Estado: Vacuna Solicitada</strong>
                  </p>
                ) : nivel?.solicitado != null && !nivel?.solicitado ? (
                  <p className="font-bold text-red-600">
                    <strong>Estado: Vacuna No Solicitada</strong>
                  </p>
                ) : (
                  <p className="font-bold text-gray-600">
                    <strong>Estado: Vacuna No Solicitada</strong>
                  </p>
                )}
              </div>
              {!nivel?.solicitado ? (
                <div>
                  <div className="mb-1">
                    <label className="font-semibold flex justify-start">
                      Nombre Vacuna
                    </label>
                    <input
                      type="text"
                      value={nombVacuna}
                      onChange={(e) => setNombVacuna(e.target.value)}
                      className="border border-gray-300 rounded px-3 py-2 w-full"
                    />
                  </div>
                  <div className="mb-2">
                    <label className="font-semibold flex justify-start">
                      Fecha de Vacunación
                    </label>
                    <input
                      type="date"
                      value={fechVacuna}
                      onChange={(e) => setFechVacuna(e.target.value)}
                      className="border border-gray-300 rounded px-3 py-2 w-full"
                    />
                  </div>
                  <button
                    onClick={handleNextStep}
                    className="w-full bg-figma-blue-button text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-75"
                    disabled={!nombVacuna || !fechVacuna}
                  >
                    Continuar
                  </button>
                </div>
              ) : nivel!.nmroNoSolicitados > 0 ? (
                <button
                  onClick={handleNextStep}
                  className="w-full bg-figma-blue-button text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-75"
                >
                  Continuar
                </button>
              ) : (
                ""
              )}
              <button
                onClick={handlePrevStep}
                className="w-full outline outline-1 outline-figma-blue-button text-figma-blue-button bg-white transition-colors py-2 mt-4 font-semibold rounded-lg hover:outline-none hover:bg-figma-blue-button hover:text-white"
              >
                Volver
              </button>
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
                onClick={() => handleSolicitarVacuna(nivel?.idVacuna)}
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
                  <button
                    onClick={() => setStep(1)}
                    className="w-full bg-figma-blue-button text-white py-2 rounded-lg hover:bg-blue-700"
                  >
                    Volver
                  </button>
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
                  <button
                    onClick={handleNextStep}
                    className="w-full bg-figma-blue-button text-white py-2 rounded-lg hover:bg-blue-700"
                  >
                    Aceptar
                  </button>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </Spin>
  );
};

export default SolicitarVacunasNivel;
