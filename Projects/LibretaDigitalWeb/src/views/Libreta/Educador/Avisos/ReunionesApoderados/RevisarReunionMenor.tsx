import { ReunionController } from "@/controllers/ReunionController";
import { useAuth } from "@/hooks/useAuth";
import { Spin } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const RevisarReunionMenor = () => {
  const { idReunion, idNivel, idMenor } = useParams<{
    idReunion: string;
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
    tituloReunion: string;
    sala: string;
    temasTratar: string[];
    fechaReunion: string;
    confirmado: boolean | null;
  }>();
  const [loading, setLoading] = useState<boolean>(true);
  const reunionController = new ReunionController();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMenor = async () => {
      setLoading(true);
      if (!isLoading && idReunion && idNivel && idMenor) {
        try {
          const menorData = await reunionController.getMenorByReunionNivelMenor(
            +idReunion,
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
  }, [isLoading, idReunion, idNivel, idMenor]);

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
                <strong>Reunión:</strong> {menor?.tituloReunion}
              </p>
              <p>
                <strong>Sala:</strong> {menor?.sala}
              </p>
              <p>
                <strong>Fecha:</strong> {menor?.fechaReunion}
              </p>
              <div className="pb-4">
                <p>
                  <strong>Temas a tratar:</strong>
                </p>
                {menor?.temasTratar.map((tema) => (
                  <p key={tema}>{tema}</p>
                ))}
              </div>
              {menor?.confirmado ? (
                <p className="font-bold text-green-700">
                  <strong>Estado: Asistencia confirmada</strong>
                </p>
              ) : menor?.confirmado != null && !menor?.confirmado ? (
                <p className="font-bold text-red-600">
                  <strong>Estado: Asistencia no confirmada</strong>
                </p>
              ) : (
                <p className="font-bold text-gray-600">
                  <strong>Estado: Asistencia no solicitada</strong>
                </p>
              )}
            </div>
            <button
              onClick={() => navigate(-1)}
              className="w-full outline outline-1 outline-figma-green text-figma-green bg-white transition-colors py-2 mt-4 font-semibold rounded-lg hover:outline-none hover:bg-figma-green hover:text-white"
            >
              Volver
            </button>
          </div>
        </main>
      </div>
    </Spin>
  );
};

export default RevisarReunionMenor;
