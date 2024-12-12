import { ItinerarioController } from "@/controllers/ItinerarioController";
import { useAuth } from "@/hooks/useAuth";
import { Spin } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const RevisarItinerarioMenorDirector = () => {
  const { idItinerario, idNivel, idMenor } = useParams<{
    idItinerario: string;
    idNivel: string;
    idMenor: string;
  }>();
  const { isLoading } = useAuth();
  const [menor, setMenor] = useState<{
    nombreMenor: string;
    nombreApoderado: string;
    telApoderado: string;
    emailApoderado: string;
    nivel: string;
    tituloActividad: string;
    fechaActividad: string;
    descActividad: string;
    realizado: boolean | null;
    confirmado: boolean | null;
  }>();
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
  const [secondModalMessage, setSecondModalMessage] = useState("");
  const itinerarioController = new ItinerarioController();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMenor = async () => {
      setLoading(true);
      if (!isLoading && idItinerario && idNivel && idMenor) {
        try {
          const menorData =
            await itinerarioController.getMenorByItinerarioNivelMenor(
              +idItinerario,
              +idNivel,
              +idMenor
            );
          if (menorData) {
            setMenor(menorData);
          }
        } catch (error) {
          console.error("Error fetching menor:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchMenor();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, idItinerario, idNivel, idMenor]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAccept = async () => {
    try {
      // Simula una llamada a una API
      if (idItinerario) {
        setLoading(true);
        const response = await itinerarioController.confirmarRealizaActividad(
          +idItinerario
        );
        if (response) {
          setSecondModalMessage("Actividad realizada");
        } else {
          setSecondModalMessage("Ha ocurrido un error");
        }
      } else {
        setSecondModalMessage("Ha ocurrido un error");
      }
    } catch (error) {
      setSecondModalMessage("Ha ocurrido un error");
      console.error("Error accepting activity:", error);
    } finally {
      setLoading(false);
      setIsModalOpen(false);
      setIsSecondModalOpen(true);
    }
  };

  const handleSecondModalAccept = () => {
    setIsSecondModalOpen(false);
    window.location.reload();
  };

  return (
    <Spin spinning={loading}>
      <div className="flex flex-col w-full sm:px-32 md:px-40 lg:px-48 xl:px-56">
        <main className="flex-1 px-4 py-2">
          <div className="text-center space-y-2">
            <h2 className="text-xl font-bold mb-2">Estado de Autorización</h2>
            <p className="mb-4">
              En esta sección encontrarás información
              <br />
              de los próximos <strong>Paseos y Visitas.</strong>
            </p>
            <p className="mb-4">
              Se muestra información del <strong>Menor</strong>
              <br />y de su <strong>Apoderado</strong>.
            </p>
            <div className="border border-gray-300 rounded-lg p-4 mb-4 bg-white">
              <p>
                <strong>Menor:</strong> {menor?.nombreMenor}
              </p>
              <p>
                <strong>Nivel:</strong> {menor?.nivel}
              </p>
              <div className="mb-1">
                <p className="text-sm">
                  <strong>Apoderado:</strong>
                </p>
                <p className="text-sm">{menor?.nombreApoderado}</p>
                <p className="text-sm">
                  {menor?.telApoderado ?? "sin telefono"}
                </p>
                <p className="text-sm">
                  {menor?.emailApoderado
                    ? menor?.emailApoderado.trim().toLowerCase()
                    : "sin correo"}
                </p>
              </div>
              <p>
                <strong>Actividad:</strong> {menor?.tituloActividad}
              </p>
              <p>
                <strong>Fecha:</strong>{" "}
                {menor?.fechaActividad.split(".").join("-")}
              </p>
              <p className="mb-2">
                <strong>Descripción:</strong>
                <br />
                {menor?.descActividad}
              </p>
              <div className="mb-2">
                {menor?.realizado ? (
                  <p className="text-black">Actividad REALIZADA</p>
                ) : (
                  <p className="text-gray-600">Actividad NO REALIZADA</p>
                )}
              </div>
              {menor?.confirmado ? (
                <p className="font-bold text-green-700">
                  <strong>Estado: Conocimiento confirmado</strong>
                </p>
              ) : menor?.confirmado != null && !menor?.confirmado ? (
                <p className="font-bold text-red-600">
                  <strong>Estado: Conocimiento no confirmado</strong>
                </p>
              ) : (
                <p className="font-bold text-gray-600">
                  <strong>Estado: Conocimiento no solicitado</strong>
                </p>
              )}
            </div>
            <button
              onClick={() => navigate(-1)}
              className="w-full outline outline-1 outline-figma-green text-figma-green bg-white transition-colors py-2 mt-4 font-semibold rounded-lg hover:outline-none hover:bg-figma-green hover:text-white"
            >
              Volver
            </button>
            {!menor?.realizado ? (
              <button
                onClick={handleOpenModal}
                className="w-full outline outline-1 outline-figma-green text-figma-green bg-white transition-colors py-2 mt-4 font-semibold rounded-lg hover:outline-none hover:bg-figma-green hover:text-white"
              >
                ¿Actividad Realizada?
              </button>
            ) : (
              ""
            )}
            {isModalOpen && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-4 rounded-lg">
                  <p className="font-semibold">
                    ¿Quieres dar por conocido que la actividad ha sido
                    realizada?
                  </p>
                  <hr className="my-2" />
                  <p>
                    La actividad en general pasará a ser marcada como realizada.
                  </p>
                  <div className="flex justify-between mt-4">
                    <button
                      onClick={handleCloseModal}
                      className="px-4 py-2 bg-gray-500 text-white rounded-lg"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={handleAccept}
                      className="mr-2 px-4 py-2 bg-green-400 text-white rounded-lg"
                    >
                      Aceptar
                    </button>
                  </div>
                </div>
              </div>
            )}
            {isSecondModalOpen && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-4 rounded-lg">
                  <p>{secondModalMessage}</p>
                  <div className="flex justify-end mt-4">
                    <button
                      onClick={handleSecondModalAccept}
                      className="px-4 py-2 bg-green-400 text-white rounded-lg"
                    >
                      Aceptar
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </Spin>
  );
};

export default RevisarItinerarioMenorDirector;
