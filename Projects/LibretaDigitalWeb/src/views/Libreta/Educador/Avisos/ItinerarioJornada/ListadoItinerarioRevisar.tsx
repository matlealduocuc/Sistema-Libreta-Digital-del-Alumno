import { useAuth } from "@/hooks/useAuth";
import { Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ObtenerInitPathName } from "@/common/FuncionesComunesUsuario";
import { ItinerarioController } from "@/controllers/ItinerarioController";

const ListadoItinerarioRevisar = () => {
  const { isLoading } = useAuth();
  const [itinerarios, setItinerarios] = useState<
    {
      idItinerario: number;
      tituloActividad: string;
      fechaItinerario: string;
    }[]
  >([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const itinerarioController = new ItinerarioController();
  const navigate = useNavigate();
  const initPathName = ObtenerInitPathName();

  useEffect(() => {
    const fetchItinerario = async () => {
      setLoading(true);
      if (!isLoading) {
        try {
          const itinerariosData =
            await itinerarioController.getItinerariosByEducador();
          if (itinerariosData) {
            setItinerarios(
              itinerariosData.map(
                (itinerario: {
                  idItinerario: number;
                  tituloActividad: string;
                  fechaItinerario: string;
                }) => ({
                  idItinerario: itinerario.idItinerario,
                  tituloActividad: itinerario.tituloActividad,
                  fechaItinerario: itinerario.fechaItinerario,
                })
              )
            );
          }
        } catch (error) {
          console.error("Error fetching itinerarios:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchItinerario();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleItinerarioClick = (idItinerario: number) => {
    navigate(
      `${initPathName}/avisos/itinerario-jornada/revisar-listado-niveles/${idItinerario}`
    );
  };

  const filteredItinerarios = itinerarios.filter((itinerario) =>
    itinerario.tituloActividad?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Spin spinning={loading}>
      <div className="px-4 py-2 w-full sm:px-32 md:px-40 lg:px-48 xl:px-56">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-xl font-bold">
            ¡Revisa el listado de Actividades!
          </h1>
        </div>
        <div className="border border-gray-300 rounded-lg p-2 mb-2 text-sm bg-gray-200">
          <span>
            Selecciona una <strong>Actividad</strong>
            <br />
            para ver el <strong>Detalle por Nivel.</strong>
          </span>
        </div>

        <div className="mb-2">
          <form
            className="max-w-full mx-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <label
              htmlFor="search"
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
                id="search"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Buscar por Actividad"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </form>
        </div>

        <div className="grid gap-2">
          {filteredItinerarios.length > 0 ? (
            filteredItinerarios.map((reunion) => (
              <div
                key={reunion.idItinerario}
                className="border border-gray-300 rounded p-4 shadow-md cursor-pointer"
                onClick={() => handleItinerarioClick(reunion.idItinerario)}
              >
                <h2 className="font-semibold">{reunion.tituloActividad}</h2>
                <p>
                  Fecha:{" "}
                  {reunion.fechaItinerario?.split(" ")[0].split(".").join("-")}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">
              No se encontraron reuniones asignadas.
            </p>
          )}
        </div>
      </div>
    </Spin>
  );
};

export default ListadoItinerarioRevisar;
