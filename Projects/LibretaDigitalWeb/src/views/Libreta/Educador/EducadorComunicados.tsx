import { useState } from "react";

const EducadorComunicados = () => {
  const [grado, setGrado] = useState("");
  const [comunicados, setComunicados] = useState<
    { id: number; titulo: string; texto: string; estado: boolean }[]
  >([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [comunicadoSeleccionado, setComunicadoSeleccionado] = useState<{
    id: number;
    titulo: string;
    texto: string;
    estado: boolean;
  } | null>(null);

  // Ejemplo de datos de comunicados
  const comunicadosEjemplo = [
    {
      id: 1,
      titulo: "Reunión de Padres",
      texto: "Recordatorio de la reunión",
      estado: true,
    },
    {
      id: 2,
      titulo: "Vacunas",
      texto: "Actualización sobre vacunación",
      estado: false,
    },
    {
      id: 3,
      titulo: "Paseo Escolar",
      texto: "Información sobre el paseo",
      estado: true,
    },
  ];

  // Manejar la búsqueda y mostrar los comunicados filtrados por grado
  const handleBuscarComunicados = () => {
    setComunicados(comunicadosEjemplo); // Aquí puedes filtrar según el grado si tienes una lista completa
  };

  // Manejar la selección de un comunicado y mostrar el modal
  const handleCardClick = (comunicado: {
    id: number;
    titulo: string;
    texto: string;
    estado: boolean;
  }) => {
    setComunicadoSeleccionado(comunicado);
    setMostrarModal(true);
  };

  // Manejar activación/desactivación del estado del comunicado
  const handleToggleEstado = () => {
    if (comunicadoSeleccionado) {
      setComunicados((prev) =>
        prev.map((com) =>
          com.id === comunicadoSeleccionado.id
            ? { ...com, estado: !com.estado }
            : com
        )
      );
      setComunicadoSeleccionado((prev) =>
        prev ? { ...prev, estado: !prev.estado } : null
      );
    }
  };

  // Manejar la eliminación del comunicado
  const handleEliminarComunicado = () => {
    if (comunicadoSeleccionado) {
      setComunicados((prev) =>
        prev.filter((com) => com.id !== comunicadoSeleccionado.id)
      );
      setMostrarModal(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Mis Comunicados</h1>

      {/* Filtro de grado */}
      <div className="mb-4 flex">
        <select
          value={grado}
          onChange={(e) => setGrado(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-full mr-2"
        >
          <option value="">Seleccione Grado</option>
          <option value="1">Grado 1</option>
          <option value="2">Grado 2</option>
          <option value="3">Grado 3</option>
        </select>
        <button
          onClick={handleBuscarComunicados}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Buscar
        </button>
      </div>

      {/* Lista de comunicados */}
      <div className="grid gap-4">
        {comunicados.map((comunicado) => (
          <div
            key={comunicado.id}
            className="border border-gray-300 rounded p-4 shadow-md cursor-pointer"
            onClick={() => handleCardClick(comunicado)}
          >
            <h2 className="font-semibold">{comunicado.titulo}</h2>
            <p>{comunicado.texto.substring(0, 50)}...</p>
          </div>
        ))}
      </div>

      {/* Modal de información del comunicado */}
      {mostrarModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 relative">
            <button
              onClick={() => setMostrarModal(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              X
            </button>
            {comunicadoSeleccionado && (
              <>
                <h2 className="text-lg font-bold mb-2">
                  {comunicadoSeleccionado.titulo}
                </h2>
                <p className="mb-4">{comunicadoSeleccionado.texto}</p>
                <p className="mb-4">
                  <strong>Estado:</strong>{" "}
                  {comunicadoSeleccionado.estado ? "Activado" : "Desactivado"}
                </p>
                <button
                  onClick={handleToggleEstado}
                  className={`px-4 py-2 rounded mb-2 w-full ${
                    comunicadoSeleccionado.estado
                      ? "bg-gray-500"
                      : "bg-blue-600"
                  } text-white`}
                >
                  {comunicadoSeleccionado.estado ? "Desactivar" : "Activar"}
                </button>
                <button
                  onClick={handleEliminarComunicado}
                  className="bg-red-600 text-white px-4 py-2 rounded w-full"
                >
                  Eliminar
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EducadorComunicados;
