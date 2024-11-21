import { useAuth } from "@/hooks/useAuth";
import { Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ObtenerInitPathName } from "@/common/FuncionesComunesUsuario";
import { NivelController } from "@/controllers/NivelController";

const ListadoNivelesAutorizadosVacuna = () => {
  const { isLoading } = useAuth();
  const [niveles, setNiveles] = useState<
    {
      idenNivel: number;
      descNombre: string;
      cantidadMenores: number;
    }[]
  >([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const nivelController = new NivelController();
  const navigate = useNavigate();
  const initPathName = ObtenerInitPathName();

  useEffect(() => {
    const fetchNiveles = async () => {
      setLoading(true);
      if (!isLoading) {
        try {
          const nivelesData = await nivelController.getNivelesWhereSomeVacuna();
          if (nivelesData) {
            setNiveles(
              nivelesData.map(
                (nivel: {
                  idenNivel: number;
                  descNombre: string;
                  cantidadMenores: number;
                }) => ({
                  idenNivel: nivel.idenNivel,
                  descNombre: nivel.descNombre,
                  cantidadMenores: nivel.cantidadMenores,
                })
              )
            );
          }
        } catch (error) {
          console.error("Error fetching niveles:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchNiveles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleNivelClick = (id: number) => {
    navigate(`${initPathName}/avisos/vacunas/menores-por-nivel/${id}`);
  };

  const filteredNiveles = niveles.filter((nivel) =>
    nivel.descNombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Spin spinning={loading}>
      <div className="p-4 w-full sm:px-32 md:px-40 lg:px-48 xl:px-56">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">Listado de Niveles</h1>
        </div>

        <div className="mb-4">
          <form
            className="max-w-full mx-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <label
              htmlFor="search-niveles"
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
                id="search-niveles"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Buscar por el nombre del nivel"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </form>
        </div>

        <div className="grid gap-4">
          {filteredNiveles.length > 0 ? (
            filteredNiveles.map((nivel) => (
              <div
                key={nivel.idenNivel}
                className="border border-gray-300 rounded p-4 shadow-md cursor-pointer"
                onClick={() => handleNivelClick(nivel.idenNivel)}
              >
                <h2 className="font-semibold">{nivel.descNombre}</h2>
                <p>Cantidad menores: {nivel.cantidadMenores}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">
              No se encontraron niveles.
            </p>
          )}
        </div>
      </div>
    </Spin>
  );
};

export default ListadoNivelesAutorizadosVacuna;
