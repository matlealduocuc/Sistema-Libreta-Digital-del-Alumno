import { useAuth } from "@/hooks/useAuth";
import { Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ObtenerInitPathName } from "@/common/FuncionesComunesUsuario";
import { PaseoController } from "@/controllers/PaseoController";

const ListadoPaseosRevisar = () => {
  const { isLoading } = useAuth();
  const [paseos, setPaseos] = useState<
    {
      idPaseo: number;
      paseo: string;
      tipoPaseo: string;
      fechaInicio: string;
      fechaFin: string;
    }[]
  >([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const paseoController = new PaseoController();
  const navigate = useNavigate();
  const initPathName = ObtenerInitPathName();

  useEffect(() => {
    const fetchPaseos = async () => {
      setLoading(true);
      if (!isLoading) {
        try {
          const paseosData = await paseoController.getPaseosByEducador();
          if (paseosData) {
            setPaseos(
              paseosData.map(
                (paseo: {
                  idPaseo: number;
                  paseo: string;
                  tipoPaseo: string;
                  fechaInicio: string;
                  fechaFin: string;
                }) => ({
                  idPaseo: paseo.idPaseo,
                  paseo: paseo.paseo,
                  tipoPaseo: paseo.tipoPaseo,
                  fechaInicio: paseo.fechaInicio,
                  fechaFin: paseo.fechaFin,
                })
              )
            );
          }
        } catch (error) {
          console.error("Error fetching paseos:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchPaseos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handlePaseoClick = (idPaseo: number) => {
    navigate(
      `${initPathName}/avisos/paseos-visitas/revisar-listado-niveles/${idPaseo}`
    );
  };

  const filteredPaseos = paseos.filter((paseo) =>
    paseo.paseo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Spin spinning={loading}>
      <div className="px-4 py-2 w-full sm:px-32 md:px-40 lg:px-48 xl:px-56">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-xl font-bold">
            ¡Revisa el Listado de Actividades!
          </h1>
        </div>
        <div className="border border-gray-300 rounded-lg p-2 mb-2 text-sm bg-gray-200">
          <span>
            Selecciona un <strong>Paseo</strong> o <strong>Visita</strong>
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
                placeholder="Buscar por Paseo"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </form>
        </div>

        <div className="grid gap-2">
          {filteredPaseos.length > 0 ? (
            filteredPaseos.map((paseo) => (
              <div
                key={paseo.idPaseo}
                className="border border-gray-300 rounded p-4 shadow-md cursor-pointer"
                onClick={() => handlePaseoClick(paseo.idPaseo)}
              >
                <h2 className="font-semibold">
                  {paseo.tipoPaseo}: {paseo.paseo}
                </h2>
                <p>Inicio: {paseo.fechaInicio.split(".").join("-")}</p>
                <p>Termino: {paseo.fechaFin.split(".").join("-")}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">
              No se encontraron paseos asignados.
            </p>
          )}
        </div>
      </div>
    </Spin>
  );
};

export default ListadoPaseosRevisar;
