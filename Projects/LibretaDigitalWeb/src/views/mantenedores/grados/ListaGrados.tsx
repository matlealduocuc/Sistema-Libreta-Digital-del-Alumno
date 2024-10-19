import { SearchInputLabelButton } from "@/components/SearchInputLabelButton";
import { Link } from "react-router-dom";

export const ListaGrados = () => {
  return (
    <>
      <div className="lg:flex lg:flex-row justify-between">
        <div className="lg:flex lg:flex-col">
          <h1 className="text-5xl font-black">Mantenedor de Grados</h1>
        </div>
        <div className="lg:flex lg:flex-col max-sm:pt-5">
          <nav className="max-sm:my-2 my-5">
            <Link
              className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
              to={`/mantenedores/grados/nuevo`}
            >
              Nuevo Grado
            </Link>
          </nav>
        </div>
      </div>

      <p className="max-sm:text-xl mb-3 text-2xl font-light text-gray-500 mt-5">
        Listado de grados
      </p>

      <SearchInputLabelButton placeholder="Buscar..." searchButtonText="Buscar" />

      <table className="w-full mt-5">
        <thead>
          <tr>
            <th className="text-left">Nombre</th>
            <th className="text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Primero</td>
            <td>
              <Link
                className="bg-blue-400 hover:bg-blue-500 px-5 py-2 text-white text-lg font-bold cursor-pointer transition-colors"
                to={`/mantenedores/grados/editar/1`}
              >
                Editar
              </Link>
            </td>
          </tr>
          <tr>
            <td>Segundo</td>
            <td>
              <Link
                className="bg-blue-400 hover:bg-blue-500 px-5 py-2 text-white text-lg font-bold cursor-pointer transition-colors"
                to={`/mantenedores/grados/editar/2`}
              >
                Editar
              </Link>
            </td>
          </tr>
          <tr>
            <td>Tercero</td>
            <td>
              <Link
                className="bg-blue-400 hover:bg-blue-500 px-5 py-2 text-white text-lg font-bold cursor-pointer transition-colors"
                to={`/mantenedores/grados/editar/3`}
              >
                Editar
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};
