import { useAuth } from "@/hooks/useAuth";
import { Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlusCircleOutlined } from "@ant-design/icons";
import { ObtenerInitPathName } from "@/common/FuncionesComunesUsuario";
import { UsuarioController } from "@/controllers/UsuarioController";

const DirectorIngresosListadoApoderados = () => {
  const { isLoading } = useAuth();
  const initPathName = ObtenerInitPathName();
  const [apoderados, setApoderados] = useState<
    {
      idApoderado: number;
      nombre: string;
      rut: string;
      email: string;
      telefono: string;
      direccion: string;
      menoresACargo: number;
      menores:
        | {
            nombre: string;
            nivel: string;
            jornada: string;
          }[]
        | null;
      activo: boolean | null;
    }[]
  >([]);
  const [apoderadoSeleccionado, setApoderadoSeleccionado] = useState<{
    idApoderado: number;
    nombre: string;
    rut: string;
    email: string;
    telefono: string;
    direccion: string;
    menoresACargo: number;
    menores:
      | {
          nombre: string;
          nivel: string;
          jornada: string;
        }[]
      | null;
    activo: boolean | null;
  } | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [isModalEstadoOpen, setIsModalEstadoOpen] = useState(false);
  const [isSecondModalEstadoOpen, setIsSecondModalEstadoOpen] = useState(false);
  const [secondModalEstadoMessage, setSecondModalEstadoMessage] = useState("");
  const [isModalEliminarOpen, setIsModalEliminarOpen] = useState(false);
  const [secondModalEliminarMessage, setSecondModalEliminarMessage] =
    useState("");
  const [isSecondModalEliminarOpen, setIsSecondModalEliminarOpen] =
    useState(false);
  const usuarioController = new UsuarioController();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApoderados = async () => {
      setLoading(true);
      if (!isLoading) {
        try {
          const apoderadosData = await usuarioController.getAllApoderados();
          if (apoderadosData) {
            setApoderados(
              apoderadosData.map(
                (apoderado: {
                  idApoderado: number;
                  nombre: string;
                  rut: string;
                  email: string;
                  telefono: string;
                  direccion: string;
                  menoresACargo: number;
                  menores:
                    | {
                        nombre: string;
                        nivel: string;
                        jornada: string;
                      }[]
                    | null;
                  activo: boolean | null;
                }) => ({
                  idApoderado: apoderado.idApoderado,
                  nombre: apoderado.nombre,
                  rut: apoderado.rut,
                  email: apoderado.email,
                  telefono: apoderado.telefono,
                  direccion: apoderado.direccion,
                  menoresACargo: apoderado.menoresACargo,
                  menores: apoderado.menores,
                  activo: apoderado.activo,
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

    fetchApoderados();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleApoderadoClick = (apoderadoSelected: {
    idApoderado: number;
    nombre: string;
    rut: string;
    email: string;
    telefono: string;
    direccion: string;
    menoresACargo: number;
    menores:
      | {
          nombre: string;
          nivel: string;
          jornada: string;
        }[]
      | null;
    activo: boolean | null;
  }) => {
    setApoderadoSeleccionado({
      idApoderado: apoderadoSelected.idApoderado,
      nombre: apoderadoSelected.nombre,
      rut: apoderadoSelected.rut,
      email: apoderadoSelected.email,
      telefono: apoderadoSelected.telefono,
      direccion: apoderadoSelected.direccion,
      menoresACargo: apoderadoSelected.menoresACargo,
      menores: apoderadoSelected.menores,
      activo: apoderadoSelected.activo,
    });
    setMostrarModal(true);
  };

  const filteredApoderados = apoderados.filter((apoderado) =>
    apoderado.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenModalEstado = () => {
    setIsModalEstadoOpen(true);
  };

  const handleCloseModalEstado = () => {
    setIsModalEstadoOpen(false);
  };

  const handleOpenModalEliminar = () => {
    setIsModalEliminarOpen(true);
  };

  const handleCloseModalEliminar = () => {
    setIsModalEliminarOpen(false);
  };

  const handleToggleEstado = async () => {
    try {
      if (apoderadoSeleccionado) {
        setLoading(true);
        const desactivado = await usuarioController.setActivacionApoderado(
          apoderadoSeleccionado.idApoderado,
          !apoderadoSeleccionado.activo
        );
        if (desactivado) {
          setSecondModalEstadoMessage("Apoderado actualizado");
          setApoderados((prev) =>
            prev.map((com) =>
              com.idApoderado === apoderadoSeleccionado.idApoderado
                ? { ...com, estado: !com.activo }
                : com
            )
          );
        } else {
          setSecondModalEstadoMessage("Ha ocurrido un error");
        }
      } else {
        setSecondModalEstadoMessage("Ha ocurrido un error");
      }
    } catch (error) {
      console.error("Error toggling estado:", error);
      setSecondModalEstadoMessage("Ha ocurrido un error");
    } finally {
      setLoading(false);
      setApoderadoSeleccionado(null);
      setMostrarModal(false);
      setIsModalEstadoOpen(false);
      setIsSecondModalEstadoOpen(true);
    }
  };

  const handleSecondModalEstadoAccept = () => {
    setIsSecondModalEstadoOpen(false);
    window.location.reload();
  };

  const handleEliminar = async () => {
    try {
      if (apoderadoSeleccionado) {
        setLoading(true);
        const eliminado = await usuarioController.deleteApoderado(
          apoderadoSeleccionado.idApoderado
        );
        if (eliminado) {
          setSecondModalEliminarMessage("Apoderado eliminado");
          setApoderados((prev) =>
            prev.filter(
              (com) => com.idApoderado !== apoderadoSeleccionado.idApoderado
            )
          );
        } else {
          setSecondModalEliminarMessage("Ha ocurrido un error");
        }
      } else {
        setSecondModalEliminarMessage("Ha ocurrido un error");
      }
    } catch (error) {
      console.error("Error toggling estado:", error);
      setSecondModalEliminarMessage("Ha ocurrido un error");
    } finally {
      setLoading(false);
      setApoderadoSeleccionado(null);
      setMostrarModal(false);
      setIsModalEliminarOpen(false);
      setIsSecondModalEliminarOpen(true);
    }
  };

  const handleSecondModalEliminarAccept = () => {
    setIsSecondModalEliminarOpen(false);
  };

  return (
    <Spin spinning={loading}>
      <div className="px-4 py-2 w-full sm:px-32 md:px-40 lg:px-48 xl:px-56">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-lg font-bold">¡Busca y Crea Apoderados!</h1>
          <button
            onClick={() => navigate(`${initPathName}/ingresos/crear-apoderado`)}
            className="bg-purple-600 text-white rounded-full p-2 hover:bg-purple-700"
          >
            <div className="flex justify-center">
              <PlusCircleOutlined className="text-2xl mr-2 text-white" />
              <span>Nuevo</span>
            </div>
          </button>
        </div>
        <div className="border border-gray-300 rounded-lg p-2 mb-2 text-sm bg-gray-200">
          <span>
            Selecciona un <strong>Apoderado</strong> para ver su{" "}
            <strong>
              Información
              <br />y Asignar menores a cargo
            </strong>
            .
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
                id="search-apoderados"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Buscar por Apoderado"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </form>
        </div>

        <div className="grid gap-2">
          {filteredApoderados.length > 0 ? (
            filteredApoderados.map((apoderado) => (
              <div
                key={apoderado.idApoderado}
                className="border border-gray-300 rounded p-4 shadow-md cursor-pointer"
                onClick={() => handleApoderadoClick(apoderado)}
              >
                <h2 className="font-semibold">{apoderado.nombre}</h2>
                <p>Menores a Cargo: {apoderado.menoresACargo}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">
              No se encontraron Apoderados.
            </p>
          )}
        </div>

        {mostrarModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto pt-24 pb-24">
            <div className="bg-white p-4 rounded-lg shadow-lg w-80 max-h-full overflow-y-auto relative">
              <button
                onClick={() => setMostrarModal(false)}
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
              >
                X
              </button>
              {apoderadoSeleccionado && (
                <>
                  <h2 className="text-lg font-bold mb-2">
                    {apoderadoSeleccionado.nombre}
                  </h2>
                  <p className="mb-0">Rut: {apoderadoSeleccionado.rut}</p>
                  <p className="mb-0">
                    Email:{" "}
                    {apoderadoSeleccionado.email?.toLowerCase() ??
                      "No registrado"}
                  </p>
                  <p className="mb-0">
                    Teléfono:{" "}
                    {apoderadoSeleccionado.telefono ?? "No registrado"}
                  </p>
                  <p className="mb-0">
                    Dirección:{" "}
                    {apoderadoSeleccionado.direccion ?? "No registrado"}
                  </p>
                  <div className="mb-4">
                    <p className="mb-0">
                      Menores a cargo:{" "}
                      {apoderadoSeleccionado.menores &&
                        apoderadoSeleccionado.menores?.length <= 0 && (
                          <span>0</span>
                        )}
                    </p>
                    {apoderadoSeleccionado.menores &&
                      apoderadoSeleccionado.menores.map((menor) => (
                        <div key={menor.nombre} className="mb-2 text-center">
                          <h3 className="font-semibold">{menor.nombre}</h3>
                          <p className="text-xs">Nivel: {menor.nivel}</p>
                          <p className="text-xs">Jornada: {menor.jornada}</p>
                        </div>
                      ))}
                  </div>

                  <button
                    onClick={() =>
                      navigate(
                        initPathName +
                          "/ingresos/editar-apoderado/" +
                          apoderadoSeleccionado.idApoderado
                      )
                    }
                    className={`px-4 py-3 rounded mb-2 w-full bg-purple-600 text-white`}
                  >
                    Editar Perfil
                  </button>
                  <button
                    onClick={() =>
                      navigate(
                        initPathName +
                          "/ingresos/asignar-menores/" +
                          apoderadoSeleccionado.idApoderado
                      )
                    }
                    className={`px-4 py-3 rounded mb-6 w-full bg-purple-600 text-white`}
                  >
                    Asignación Menores
                  </button>
                  <button
                    onClick={handleOpenModalEstado}
                    className={`px-4 py-2 rounded mb-2 w-full ${
                      apoderadoSeleccionado.activo
                        ? "bg-gray-500 text-white"
                        : "text-purple-600 bg-white border border-purple-600"
                    } `}
                  >
                    {apoderadoSeleccionado.activo ? "Desactivar" : "Activar"}
                  </button>
                  <button
                    onClick={handleOpenModalEliminar}
                    className="bg-red-600 text-white px-4 py-2 rounded w-full"
                  >
                    Eliminar
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {isModalEstadoOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-lg">
              <p className="font-semibold">
                ¿Realmente quieres{" "}
                {apoderadoSeleccionado && apoderadoSeleccionado.activo
                  ? "DESACTIVAR"
                  : "ACTIVAR"}{" "}
                el apoderado?
              </p>
              <hr className="my-2" />
              <p className="text-center">
                El apoderado y los menores a cargo seran{" "}
                <strong>
                  {apoderadoSeleccionado && apoderadoSeleccionado.activo
                    ? "desactivados"
                    : "activados"}
                </strong>
                .
              </p>
              <div className="flex justify-between mt-4">
                <button
                  onClick={handleCloseModalEstado}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleToggleEstado}
                  className="mr-2 px-4 py-2 bg-figma-purple text-white rounded-lg"
                >
                  Aceptar
                </button>
              </div>
            </div>
          </div>
        )}
        {isSecondModalEstadoOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-lg">
              <p>{secondModalEstadoMessage}</p>
              <div className="flex justify-end mt-4">
                <button
                  onClick={handleSecondModalEstadoAccept}
                  className="px-4 py-2 bg-figma-purple text-white rounded-lg"
                >
                  Aceptar
                </button>
              </div>
            </div>
          </div>
        )}
        {isModalEliminarOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-lg">
              <p className="font-semibold">
                ¿Realmente quieres ELIMINAR el apoderado?
              </p>
              <hr className="my-2" />
              <p className="text-center">
                El apoderado y los menores a cargo serán{" "}
                <strong>eliminados</strong>.
              </p>
              <p className="text-center">Esta acción no se puede revertir.</p>
              <div className="flex justify-between mt-4">
                <button
                  onClick={handleCloseModalEliminar}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleEliminar}
                  className="mr-2 px-4 py-2 bg-figma-purple text-white rounded-lg"
                >
                  Aceptar
                </button>
              </div>
            </div>
          </div>
        )}
        {isSecondModalEliminarOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-lg">
              <p>{secondModalEliminarMessage}</p>
              <div className="flex justify-end mt-4">
                <button
                  onClick={handleSecondModalEliminarAccept}
                  className="px-4 py-2 bg-figma-purple text-white rounded-lg"
                >
                  Aceptar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Spin>
  );
};

export default DirectorIngresosListadoApoderados;
