import { Link } from "react-router-dom";

export const ListaGrados = () => {
  return (
    <>
      <div className="lg:flex lg:flex-row justify-between">
        <div className="lg:flex lg:flex-col">
          <h1 className="text-5xl font-black">Mantenedor de Grados</h1>
        </div>
        <div className="lg:flex lg:flex-col max-sm:pt-5">
          <nav className="my-5">
            <Link
              className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
              to={`/mantenedores/grados/nuevo`}
            >
              Nuevo Grado
            </Link>
          </nav>
        </div>
      </div>

      <p className="text-2xl font-light text-gray-500 mt-5">
        Listado de grados
      </p>
    </>
  );
};
