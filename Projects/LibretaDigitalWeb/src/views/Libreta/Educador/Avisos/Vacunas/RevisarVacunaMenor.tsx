import { VacunaController } from "@/controllers/VacunaController";
import { useAuth } from "@/hooks/useAuth";
import { Spin } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const RevisarVacunaMenor = () => {
  const { idNivel, idMenor } = useParams<{
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
    nombreVacuna: string;
    fechaVacuna: string;
    autorizado: boolean | null;
  }>();
  const [loading, setLoading] = useState<boolean>(true);
  const vacunaController = new VacunaController();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMenor = async () => {
      setLoading(true);
      if (!isLoading && idNivel && idMenor) {
        try {
          const menorData = await vacunaController.getMenorByNivelMenor(
            +idNivel,
            +idMenor
          );
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
  }, [isLoading, idNivel, idMenor]);

  return (
    <Spin spinning={loading}>
      <div className="min-h-screen flex flex-col w-full sm:px-32 md:px-40 lg:px-48 xl:px-56">
        <main className="flex-1 px-4 py-2">
          <div className="text-center space-y-4">
            <h2 className="text-xl font-bold mb-2">Estado de Autorización</h2>
            <p className="mb-4">
              En el recuadro se indica el nombre del menor,
              <br />
              la <strong>Vacuna Pendiente</strong>
              <br />y su <strong>Estado de Autorización</strong>.
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
                <strong>Vacuna:</strong> {menor?.nombreVacuna}
              </p>
              <p>
                <strong>Fecha Vacuna:</strong> {menor?.fechaVacuna}
              </p>
              {menor?.autorizado ? (
                <p className="font-bold text-green-700">
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
            <button
              onClick={() => navigate(-1)}
              className="w-full bg-figma-blue-button text-white py-2 rounded-lg hover:bg-blue-700"
            >
              Volver
            </button>
          </div>
        </main>
      </div>
    </Spin>
  );
};

export default RevisarVacunaMenor;
