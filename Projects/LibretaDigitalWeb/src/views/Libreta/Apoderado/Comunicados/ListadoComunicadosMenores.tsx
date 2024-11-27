import { ObtenerInitPathName } from "@/common/FuncionesComunesUsuario";
import { ComunicadoController } from "@/controllers/ComunicadoController";
import { MenorController } from "@/controllers/MenorController";
import { useAuth } from "@/hooks/useAuth";
import { Spin } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ListadoComunicadosMenores = () => {
  const { isLoading } = useAuth();
  const { idMenor } = useParams();
  const [filteredComunicados, setFilteredComunicados] = useState<
    {
      idComunicado: number;
      de: string;
      rol: string;
      nivel: string;
      titulo: string;
      fechaComunicado: string;
      confirmado: boolean | null;
    }[]
  >([]);
  const [menores, setMenores] = useState<
    {
      key: number;
      text: string;
    }[]
  >([]);
  const [menor, setMenor] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const menorController = new MenorController();
  const comunicadoController = new ComunicadoController();
  const initPathName = ObtenerInitPathName();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMenores = async () => {
      setLoading(true);
      if (!isLoading) {
        try {
          const menoresData = await menorController.getMenoresByApoderado();
          if (menoresData) {
            setMenores(
              menoresData.map((menor: { key: number; text: string }) => ({
                key: menor.key,
                text: menor.text,
              }))
            );
          }
        } catch (error) {
          console.error("Error fetching menores:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchMenores();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  useEffect(() => {
    if (idMenor && parseInt(idMenor) <= menores.length) {
      setMenor(idMenor);
    }
  }, [idMenor, menores.length]);

  useEffect(() => {
    const newPath = `${initPathName}/comunicados/listado-comunicados${
      menor != "" ? "/" + menor : ""
    }`;
    if (window.location.pathname !== newPath) {
      window.history.replaceState(null, "", newPath);
    }
  }, [initPathName, menor]);

  useEffect(() => {
    handleBuscarComunicados();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menor]);

  const handleBuscarComunicados = async () => {
    setLoading(true);
    try {
      if (menor) {
        const comunicados = await comunicadoController.getComunicadosByMenor(
          +menor
        );
        setFilteredComunicados(comunicados);
      } else {
        setFilteredComunicados([]);
      }
    } catch (error) {
      console.error("Error al buscar comunicados:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleComunicadoClick = (idComunicado: number) => {
    navigate(`${initPathName}/comunicados/comunicado/${menor}/${idComunicado}`);
  };

  return (
    <Spin spinning={loading}>
      <div className="px-4 py-2 w-full sm:px-32 md:px-40 lg:px-48 xl:px-56">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-xl font-bold">¡Filtra por Menor!</h1>
        </div>
        <div className="border border-gray-300 rounded-lg p-2 mb-2 text-sm bg-gray-200">
          <span>
            Selecciona un <strong>Menor</strong> a tu cargo y haz click
            <br />
            en <strong>"Buscar"</strong> para filtrar tus mensajes.
          </span>
        </div>

        <div className="mb-2">
          <form
            className="max-w-full mx-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="mb-2 flex">
              <select
                value={menor}
                onChange={(e) => setMenor(e.target.value)}
                className="border text-sm border-gray-300 rounded px-3 py-2 w-full"
                disabled={loading}
              >
                <option value="">Seleccionar Menor</option>
                {menores.map((menor) => (
                  <option key={menor.key} value={menor.key}>
                    {menor.text}
                  </option>
                ))}
              </select>
            </div>
          </form>
        </div>

        <div className="grid gap-2">
          {filteredComunicados.length > 0 ? (
            filteredComunicados.map((comunicado) => (
              <div
                key={menor + "-" + comunicado.idComunicado}
                className={`border border-gray-300 rounded px-4 py-2 shadow-md cursor-pointer text-sm`}
                onClick={() => handleComunicadoClick(comunicado.idComunicado)}
              >
                <p>
                  <strong>De:</strong> {comunicado.de}
                </p>
                <p>
                  <strong>Cargo:</strong> {comunicado.rol}
                </p>
                <p>
                  <strong>Nivel:</strong> {comunicado.nivel}
                </p>
                <p>
                  <strong>Asunto:</strong> {comunicado.titulo}
                </p>
                <p>
                  <strong>Enviado:</strong>{" "}
                  {comunicado.fechaComunicado.split(".").join("-")}
                </p>
                {comunicado.confirmado ? (
                  <p className="text-green-700 font-bold">
                    Conocimiento: CONFIRMADO
                  </p>
                ) : comunicado.confirmado != null && !comunicado.confirmado ? (
                  <p className="text-red-600 font-bold">
                    Conocimiento: NO CONFIRMADO
                  </p>
                ) : (
                  <p>Estado: NO SE HA SOLICITADO</p>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">
              No se encontraron comunicados.
            </p>
          )}
        </div>
      </div>
    </Spin>
  );
};

export default ListadoComunicadosMenores;
