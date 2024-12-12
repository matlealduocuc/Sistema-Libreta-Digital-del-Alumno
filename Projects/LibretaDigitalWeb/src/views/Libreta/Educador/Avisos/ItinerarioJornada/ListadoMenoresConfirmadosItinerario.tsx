import { useAuth } from "@/hooks/useAuth";
import { Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ObtenerInitPathName } from "@/common/FuncionesComunesUsuario";
import { ItinerarioController } from "@/controllers/ItinerarioController";

const ListadoMenoresConfirmadosItinerario = () => {
  const { idItinerario, idNivel } = useParams<{
    idItinerario: string;
    idNivel: string;
  }>();
  const { isLoading } = useAuth();
  const [menores, setMenores] = useState<
    {
      idMenor: number;
      nombre: string;
      nombreApoderado: string;
      confirmado: boolean | null;
    }[]
  >([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const itinerarioController = new ItinerarioController();
  const initPathName = ObtenerInitPathName();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMenores = async () => {
      setLoading(true);
      if (!isLoading && idItinerario && idNivel) {
        try {
          const menoresData =
            await itinerarioController.getMenoresByItinerarioNivel(
              +idItinerario,
              +idNivel
            );
          if (menoresData) {
            setMenores(
              menoresData.map(
                (menor: {
                  idMenor: number;
                  nombre: string;
                  nombreApoderado: string;
                  confirmado: boolean | null;
                }) => ({
                  idMenor: menor.idMenor,
                  nombre: menor.nombre,
                  nombreApoderado: menor.nombreApoderado,
                  confirmado: menor.confirmado,
                })
              )
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
  }, [isLoading, idItinerario, idNivel]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleMenorClick = (idMenor: number) => {
    if (idItinerario && idNivel) {
      navigate(
        `${initPathName}/avisos/itinerario-jornada/revisar-menor/${+idItinerario}/${+idNivel}/${idMenor}`
      );
    }
  };

  const filteredMenores = menores.filter((menor) =>
    menor.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Spin spinning={loading}>
      <div className="px-4 py-2 w-full sm:px-32 md:px-40 lg:px-48 xl:px-56">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-xl font-bold">
            ¡Revisa Autorizaciones según Menor!
          </h1>
        </div>
        <div className="border border-gray-300 rounded-lg p-2 mb-2 text-sm bg-gray-200">
          <span>
            Selecciona un <strong>Menor</strong> para ver el{" "}
            <strong>
              Estado de
              <br />
              Confirmación de Conocimiento
            </strong>{" "}
            de su apoderado.
          </span>
        </div>

        <div className="mb-2">
          <form
            className="max-w-full mx-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <label
              htmlFor="search-menores"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Buscar
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="search-menores"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Buscar por Menor"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </form>
        </div>

        <div className="grid gap-2">
          {filteredMenores.length > 0 ? (
            filteredMenores.map((menor) => (
              <div
                key={menor.idMenor + "-" + idItinerario + "-" + idNivel}
                className="border border-gray-300 rounded p-4 shadow-md cursor-pointer"
                onClick={() => handleMenorClick(menor.idMenor)}
              >
                <h2 className="font-semibold">{menor.nombre}</h2>
                <p>Apoderado: {menor.nombreApoderado}</p>
                {menor.confirmado ? (
                  <p className="text-green-700 font-bold">
                    Estado Conocimiento: CONFIRMADA
                  </p>
                ) : (
                  <p className="text-red-700 font-bold">
                    Estado Conocimiento: NO CONFIRMADA
                  </p>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">
              No se encontraron menores.
            </p>
          )}
        </div>
      </div>
    </Spin>
  );
};

export default ListadoMenoresConfirmadosItinerario;
