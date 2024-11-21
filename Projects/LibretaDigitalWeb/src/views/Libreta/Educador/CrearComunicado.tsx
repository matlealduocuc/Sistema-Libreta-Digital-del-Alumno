import { ComunicadoController } from "@/controllers/ComunicadoController";
import { GradoController } from "@/controllers/GradoController";
import { MenorController } from "@/controllers/MenorController";
import { useAuth } from "@/hooks/useAuth";
import { Spin } from "antd";
import React, { useEffect, useState } from "react";

const CrearComunicado = () => {
  const { isLoading } = useAuth();
  const [loadingFull, setLoadingFull] = React.useState<boolean>(true);
  const [tipoComunicado, setTipoComunicado] = useState("");
  const [tiposComunicadoSelect, setTiposComunicadoSelect] = useState<
    { key: number; text: string }[]
  >([]);
  const [grado, setGrado] = useState("");
  const [gradosSelect, setGradosSelect] = useState<
    { key: number; text: string }[]
  >([]);
  const [enviarATodos, setEnviarATodos] = useState(true);
  const [menoresSelect, setMenoresSelect] = useState<
    { id: number; nombreMenor: string; nombreApoderado: string }[]
  >([]);
  const [menoresSeleccionados, setMenoresSeleccionados] = useState<number[]>(
    []
  );
  const [mostrarSeleccionMenores, setMostrarSeleccionMenores] = useState(false);
  const [enviarPorCorreo, setEnviarPorCorreo] = useState(true);
  const [titulo, setTitulo] = useState("");
  const [textoComunicado, setTextoComunicado] = useState("");
  const [fechaHoraVisible, setFechaHoraVisible] = useState("");
  const [usarFechaHora, setUsarFechaHora] = useState(false);
  const gradoController = new GradoController();
  const comunicadoController = new ComunicadoController();
  const menorController = new MenorController();

  useEffect(() => {
    setLoadingFull(true);
    const fetchGrados = async () => {
      if (!isLoading) {
        try {
          const grados = await gradoController.getGradosByEducadorIdPersona();
          if (grados) {
            setGradosSelect(
              grados.map(
                (grado: { iden_grado: number; desc_nombre: string }) => ({
                  key: grado.iden_grado,
                  text: grado.desc_nombre,
                })
              )
            );
          }
          const tiposComunicado =
            await comunicadoController.getTiposComunicado();
          if (tiposComunicado) {
            setTiposComunicadoSelect(
              tiposComunicado.map(
                (tipo: {
                  iden_tipo_comunicado: number;
                  desc_nombre: string;
                }) => ({
                  key: tipo.iden_tipo_comunicado,
                  text: tipo.desc_nombre,
                })
              )
            );
          }
          setLoadingFull(false);
        } catch (error) {
          setLoadingFull(false);
          console.error("Error fetching perfil:", error);
        }
      }
    };

    fetchGrados();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  useEffect(() => {
    setMostrarSeleccionMenores(false);
    setMenoresSeleccionados([]);
    const fetchMenores = async () => {
      if (grado != "") {
        setLoadingFull(true);
        try {
          const menores =
            await menorController.getSelectMenoresApoderadoByIdNivel(
              Number(grado)
            );
          if (menores) {
            setMenoresSelect(
              menores.map(
                (menor: {
                  iden_menor: number;
                  nombreMenor: string;
                  nombreApoderado: string;
                }) => ({
                  id: menor.iden_menor,
                  nombreMenor: menor.nombreMenor,
                  nombreApoderado: menor.nombreApoderado,
                })
              )
            );
          }
          setEnviarATodos(true);
          setLoadingFull(false);
        } catch (error) {
          setLoadingFull(false);
          console.error("Error fetching perfil:", error);
        }
      }
    };

    fetchMenores();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [grado]);

  const menoresEjemplo = [
    { id: 1, nombre: "Alejandra González", apoderado: "Carlos González" },
    { id: 2, nombre: "Juan Pérez", apoderado: "Ana Pérez" },
    { id: 3, nombre: "Laura Rodríguez", apoderado: "Luis Rodríguez" },
    // Agrega más ejemplos según sea necesario
  ];

  const handleCheckboxChange = (id: number) => {
    setMenoresSeleccionados((prev) => {
      if (prev.includes(id)) {
        return prev.filter((menorId) => menorId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleEnviarComunicado = () => {
    const seleccionados = menoresEjemplo.filter((menor) =>
      menoresSeleccionados.includes(menor.id)
    );
    console.log({
      tipoComunicado,
      grado,
      enviarATodos,
      menoresSeleccionados: seleccionados,
      enviarPorCorreo,
      titulo,
      textoComunicado,
      fechaHoraVisible: usarFechaHora ? fechaHoraVisible : null,
    });
    alert("Comunicado enviado");
  };

  return (
    <Spin spinning={loadingFull}>
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">Crear Comunicado</h1>

        {/* Tipo de comunicado */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Tipo de Comunicado</label>
          <select
            value={tipoComunicado}
            onChange={(e) => setTipoComunicado(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          >
            <option value="">Seleccionar Tipo</option>
            {tiposComunicadoSelect.map((tipo) => (
              <option key={tipo.key} value={tipo.key}>
                {tipo.text}
              </option>
            ))}
          </select>
        </div>

        {/* Grado */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Grado</label>
          <select
            value={grado}
            onChange={(e) => setGrado(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 w-full text-xs"
          >
            <option value="">Seleccionar Grado</option>
            <option value="1">Prueba 1</option>
            {gradosSelect.map((grado) => (
              <option key={grado.key} value={grado.key}>
                {grado.text}
              </option>
            ))}
          </select>
        </div>

        {/* Check de enviar a todos */}
        {grado != "" && (
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={enviarATodos}
                onChange={(e) => setEnviarATodos(e.target.checked)}
                className="mr-2"
              />
              <p className="text-xs">
                Enviar a todos los apoderados de menores del grado
              </p>
            </label>
          </div>
        )}

        {/* Botón para seleccionar menores */}
        {grado != "" && !enviarATodos && (
          <div className="mb-4">
            <button
              onClick={() =>
                setMostrarSeleccionMenores(!mostrarSeleccionMenores)
              }
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 w-full text-left"
            >
              Seleccionar Menores
            </button>

            {/* Lista de checkboxes para seleccionar menores */}
            {mostrarSeleccionMenores && (
              <div className="border border-gray-300 rounded p-4 mt-2 bg-white shadow-md">
                <h2 className="font-semibold mb-2">Selecciona los menores:</h2>
                {menoresSelect.map((menor) => (
                  <label key={menor.id} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      checked={menoresSeleccionados.includes(menor.id)}
                      onChange={() => handleCheckboxChange(menor.id)}
                      key={menor.id}
                      className="mr-2 text-sm"
                    />
                    {menor.nombreMenor} - Apoderado: {menor.nombreApoderado}
                  </label>
                ))}
                <button
                  onClick={() => setMostrarSeleccionMenores(false)}
                  className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Aceptar Selección
                </button>
              </div>
            )}

            {/* Mostrar lista de seleccionados */}
            {menoresSeleccionados.length > 0 && (
              <div className="mt-4">
                <h2 className="font-semibold">Menores seleccionados:</h2>
                <ul className="list-disc list-inside">
                  {menoresSelect
                    .filter((menor) => menoresSeleccionados.includes(menor.id))
                    .map((menor) => (
                      <li key={menor.id}>
                        {menor.nombreMenor} - Apoderado: {menor.nombreApoderado}
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Check de enviar al correo */}
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={enviarPorCorreo}
              onChange={(e) => setEnviarPorCorreo(e.target.checked)}
              className="mr-2"
            />
            Enviar al correo del apoderado
          </label>
        </div>

        {/* Check para mostrar campo de fecha y hora de visibilidad */}
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={usarFechaHora}
              onChange={(e) => setUsarFechaHora(e.target.checked)}
              className="mr-2"
            />
            Establecer fecha y hora de visibilidad
          </label>
        </div>

        {/* Campo de Fecha y Hora de Visibilidad */}
        {usarFechaHora && (
          <div className="mb-4">
            <label className="block font-semibold mb-1">
              Fecha y hora de visibilidad
            </label>
            <input
              type="datetime-local"
              value={fechaHoraVisible}
              onChange={(e) => setFechaHoraVisible(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 w-full"
            />
          </div>
        )}

        {/* Título del comunicado */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">
            Título del Comunicado
          </label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>

        {/* Texto del comunicado */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">
            Texto del Comunicado
          </label>
          <textarea
            value={textoComunicado}
            onChange={(e) => setTextoComunicado(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 w-full h-32"
          ></textarea>
        </div>

        {/* Botón enviar comunicado */}
        <button
          onClick={handleEnviarComunicado}
          className="bg-blue-600 disabled:bg-blue-300 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
          disabled={
            tipoComunicado == "" ||
            grado == "" ||
            (!enviarATodos && menoresSeleccionados.length >= 0) ||
            (usarFechaHora && fechaHoraVisible == "") ||
            titulo.trim() == "" ||
            textoComunicado.trim() == ""
          }
        >
          Enviar Comunicado
        </button>
      </div>
    </Spin>
  );
};

export default CrearComunicado;
