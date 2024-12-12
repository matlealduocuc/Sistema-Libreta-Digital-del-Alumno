import { NivelController } from "@/controllers/NivelController";
import { ReunionController } from "@/controllers/ReunionController";
import { SalaController } from "@/controllers/SalaController";
import { ReunionData } from "@/dtos/Reunion/ReunionData";
import { useAuth } from "@/hooks/useAuth";
import { Spin } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ObtenerInitPathName } from "@/common/FuncionesComunesUsuario";

const CrearReunionApoderadosDirector = () => {
  const { isLoading } = useAuth();
  const [loadingFull, setLoadingFull] = React.useState<boolean>(true);
  const [salaReunion, setSalaReunion] = useState("");
  const [salasReunionSelect, setSalasReunionSelect] = useState<
    { key: number; text: string }[]
  >([]);
  const [nivelesSelect, setNivelesSelect] = useState<
    { key: number; text: string }[]
  >([]);
  const [enviarATodosNiveles, setEnviarATodosNiveles] = useState(true);
  const [nivelesSeleccionados, setNivelesSeleccionados] = useState<number[]>(
    []
  );
  const [mostrarSeleccionNiveles, setMostrarSeleccionNiveles] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [temas, setTemas] = useState<string[]>([""]);
  const [fechaReunion, setFechaReunion] = useState("");
  const [step, setStep] = useState(1);
  const [isErrorConfirmar, setIsErrorConfirmar] = useState<boolean>(true);
  const navigate = useNavigate();
  const nivelController = new NivelController();
  const salaController = new SalaController();
  const reunionController = new ReunionController();
  const initPathName = ObtenerInitPathName();

  useEffect(() => {
    setLoadingFull(true);
    const fetchSalas = async () => {
      if (!isLoading) {
        try {
          const niveles = await nivelController.getNivelesByEducador();
          if (niveles) {
            setNivelesSelect(
              niveles.map((nivel: { key: number; text: string }) => ({
                key: nivel.key,
                text: nivel.text,
              }))
            );
          }
          const salas = await salaController.getSalas();
          if (salas) {
            setSalasReunionSelect(
              salas.map((tipo: { key: number; text: string }) => ({
                key: tipo.key,
                text: tipo.text,
              }))
            );
          }
          setLoadingFull(false);
        } catch (error) {
          setLoadingFull(false);
          console.error("Error fetching perfil:", error);
        }
      }
    };

    fetchSalas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const handleCheckboxChange = (id: number) => {
    setNivelesSeleccionados((prev) =>
      prev.includes(id)
        ? prev.filter((nivelId) => nivelId !== id)
        : [...prev, id]
    );
  };

  const handleCrearReunion = async () => {
    try {
      setLoadingFull(true);
      const fechaReunionDate = new Date(fechaReunion);
      fechaReunionDate.setMinutes(
        fechaReunionDate.getMinutes() - fechaReunionDate.getTimezoneOffset()
      );
      const requestData = new ReunionData(
        titulo,
        temas,
        Number(salaReunion),
        fechaReunionDate,
        enviarATodosNiveles,
        nivelesSeleccionados
      );
      const enviado = await reunionController.crearReunion(requestData);
      setIsErrorConfirmar(!enviado);
    } catch (error) {
      console.error("Error creando reunión:", error);
      setIsErrorConfirmar(true);
    } finally {
      setStep(3);
      setLoadingFull(false);
    }
  };

  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      navigate(initPathName + "/comunicados/home");
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigate(-1);
    }
  };

  const handleAgregarTema = () => {
    setTemas([...temas, ""]);
  };

  const handleEliminarTema = (index: number) => {
    const nuevosTemas = temas.filter((_, i) => i !== index);
    setTemas(nuevosTemas);
  };

  const handleTemaChange = (index: number, value: string) => {
    const nuevosTemas = temas.map((tema, i) => (i === index ? value : tema));
    setTemas(nuevosTemas);
  };

  return (
    <Spin spinning={loadingFull}>
      <div className="p-4 sm:mx-16 md:mx-28 lg:mx-40 xl:mx-64">
        {step === 1 && (
          <div>
            <h1 className="text-xl font-bold mb-2">
              Solicitar Reunión de Apoderados
            </h1>
            <div className="border border-gray-300 rounded-lg p-2 mb-2 text-sm bg-gray-200">
              <span>
                <strong>Crea una Reunión a tus Niveles asignados.</strong>
                <br />
                Haz click en <strong>"Crear"</strong> para crear una reunión y
                <br />
                luego en <strong>"Aceptar"</strong>.
              </span>
            </div>

            <div className="mb-2">
              <label className="block font-semibold mb-1">Titulo</label>
              <input
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 w-full"
              />
            </div>
            <div className="mb-2">
              <div className="flex align-middle justify-between mb-2">
                <label className="block font-semibold">Temas a tratar</label>
                <button
                  type="button"
                  onClick={handleAgregarTema}
                  className="bg-green-500 text-white rounded-full p-2 text-sm disabled:opacity-50"
                  disabled={temas.length >= 10}
                >
                  <div className="flex justify-center">
                    <PlusCircleOutlined className="text-lg mr-2 text-white" />
                    <span>Agregar</span>
                  </div>
                </button>
              </div>
              {temas.map((tema, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="text"
                    value={tema}
                    onChange={(e) => handleTemaChange(index, e.target.value)}
                    className="border border-gray-300 rounded px-3 py-2 w-full mr-2"
                  />
                  <button
                    type="button"
                    onClick={() => handleEliminarTema(index)}
                    className="bg-red-500 text-white px-2 py-1 rounded disabled:opacity-50"
                    disabled={temas.length === 1}
                  >
                    Eliminar
                  </button>
                </div>
              ))}
            </div>
            <div className="mb-2">
              <label className="block font-semibold mb-1">
                Sala de Reunión
              </label>
              <select
                value={salaReunion}
                onChange={(e) => setSalaReunion(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 w-full"
              >
                <option value="">Seleccionar Sala</option>
                {salasReunionSelect.map((sala) => (
                  <option key={sala.key} value={sala.key}>
                    {sala.text}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-2">
              <label className="block font-semibold mb-1">Fecha Reunión</label>
              <input
                type="datetime-local"
                value={fechaReunion}
                onChange={(e) => setFechaReunion(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 w-full"
              />
            </div>
            <div className="mb-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={enviarATodosNiveles}
                  onChange={(e) => setEnviarATodosNiveles(e.target.checked)}
                  className="mr-2"
                />
                <p>Enviar a todos los niveles</p>
              </label>
            </div>

            {!enviarATodosNiveles && (
              <div className="mb-2">
                <button
                  onClick={() =>
                    setMostrarSeleccionNiveles(!mostrarSeleccionNiveles)
                  }
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 w-full text-left"
                >
                  Seleccionar Niveles
                </button>

                {mostrarSeleccionNiveles && (
                  <div className="border border-gray-300 rounded p-4 mt-2 bg-white shadow-md">
                    <h2 className="font-semibold mb-2">
                      Selecciona los niveles:
                    </h2>
                    {nivelesSelect.map((nivel) => (
                      <label key={nivel.key} className="flex items-center mb-2">
                        <input
                          type="checkbox"
                          checked={nivelesSeleccionados.includes(nivel.key)}
                          onChange={() => handleCheckboxChange(nivel.key)}
                          className="mr-2 text-sm"
                        />
                        {nivel.text}
                      </label>
                    ))}
                  </div>
                )}

                {nivelesSeleccionados.length > 0 && (
                  <div className="mt-4">
                    <h2 className="font-semibold">Niveles seleccionados:</h2>
                    <ul className="list-disc list-inside">
                      {nivelesSelect
                        .filter((nivel) =>
                          nivelesSeleccionados.includes(nivel.key)
                        )
                        .map((nivel) => (
                          <li key={nivel.key}>{nivel.text}</li>
                        ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
            <button
              onClick={handleNextStep}
              className="bg-green-500 disabled:bg-green-200 text-white px-4 py-2 rounded hover:bg-green-700 w-full h-12"
              disabled={
                salaReunion == "" ||
                (!enviarATodosNiveles && nivelesSeleccionados.length < 1) ||
                titulo.trim() == "" ||
                temas.filter((tema) => tema.trim() != "").length < 1 ||
                temas.filter((tema) => tema.trim() != "").length > 10 ||
                fechaReunion.trim() == ""
              }
            >
              Crear
            </button>
          </div>
        )}
        {step === 2 && (
          <div className="text-center">
            <h2 className="text-xl font-bold mb-4">¡Crea la Reunión!</h2>
            <p className="mb-4">
              Haz click en <strong>"Aceptar"</strong>
              <br />
              para <strong>Crear la Reunión</strong>.
            </p>
            <div className="border border-gray-300 rounded-lg p-4 mb-4 bg-white">
              <p className="text-center font-semibold">
                ¿Deseas crear la Reunión?
              </p>
            </div>
            <button
              onClick={() => handleCrearReunion()}
              className="w-full bg-figma-green text-white py-2 rounded-lg hover:bg-green-700"
            >
              Aceptar
            </button>
            <button
              onClick={() => handlePrevStep()}
              className="w-full outline outline-1 outline-figma-green text-figma-green bg-white transition-colors py-2 mt-4 font-semibold rounded-lg hover:outline-none hover:bg-figma-green hover:text-white"
            >
              Volver
            </button>
          </div>
        )}
        {step === 3 && (
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-bold mb-4">Confirmación de Envío</h2>
            {isErrorConfirmar ? (
              <div>
                <div className="flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-20 w-20 text-red-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="11"
                      stroke="currentColor"
                      strokeWidth={2}
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 16L16 8M8 8l8 8"
                    />
                  </svg>
                </div>
                <p className="text-red-500 font-bold text-lg mb-4 text-center">
                  Error al
                  <br />
                  Enviar
                </p>
                <button
                  onClick={() => setStep(1)}
                  className="w-full bg-figma-green text-white py-2 rounded-lg hover:bg-green-700"
                >
                  Volver
                </button>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-20 w-20 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <p className="text-green-600 font-bold text-lg mb-4 text-center">
                  Reunión
                  <br />
                  Creado
                </p>
                <button
                  onClick={handleNextStep}
                  className="w-full bg-figma-green text-white py-2 rounded-lg hover:bg-green-700"
                >
                  Aceptar
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </Spin>
  );
};

export default CrearReunionApoderadosDirector;
