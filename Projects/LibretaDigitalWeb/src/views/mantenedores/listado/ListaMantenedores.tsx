import { Link } from "react-router-dom";

export const ListaMantenedores = () => {
  return (
    <>
      <div className="flex flex-row mb-10">
        <div className="lg:flex lg:flex-col">
          <h1 className="text-5xl font-black">Listado de Mantenedores</h1>
        </div>
      </div>
      <nav className="my-2">
        <div className="grid justify-items-center max-sm:grid-cols-2 max-lg:grid-cols-4 max-xl:grid-cols-6">
          <div className="mb-10">
            <Link
              className="bg-purple-400 hover:bg-purple-500 px-8 py-3 text-white text-sm font-bold cursor-pointer transition-colors"
              to={`/mantenedores/grados/lista`}
            >
              <span>Grados</span>
            </Link>
          </div>
          <div className="mb-10">
            <Link
              className="bg-purple-400 hover:bg-purple-500 px-8 py-3 text-white text-sm font-bold cursor-pointer transition-colors"
              to={`/mantenedores/grados/nuevo`}
            >
              <span>Menores</span>
            </Link>
          </div>
          <div className="mb-10">
            <Link
              className="bg-purple-400 hover:bg-purple-500 px-8 py-3 text-white text-sm font-bold cursor-pointer transition-colors"
              to={`/mantenedores/grados/nuevo`}
            >
              <span>Personas</span>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};
