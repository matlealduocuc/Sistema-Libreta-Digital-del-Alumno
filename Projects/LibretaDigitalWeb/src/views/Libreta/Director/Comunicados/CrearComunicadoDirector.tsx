import { ComunicadoController } from "@/controllers/ComunicadoController";
import { MenorController } from "@/controllers/MenorController";
import { useAuth } from "@/hooks/useAuth";
import { Spin } from "antd";
import React, { useEffect, useState } from "react";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  ClassicEditor,
  Bold,
  Essentials,
  Indent,
  IndentBlock,
  Italic,
  Highlight,
  Paragraph,
  Table,
  Undo,
  AccessibilityHelp,
  Alignment,
  Autoformat,
  Autosave,
  BalloonToolbar,
  BlockQuote,
  Code,
  FontBackgroundColor,
  FontColor,
  FontFamily,
  FontSize,
  GeneralHtmlSupport,
  HorizontalLine,
  RemoveFormat,
  SelectAll,
  Strikethrough,
  Subscript,
  Superscript,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableProperties,
  TableToolbar,
  TextTransformation,
  Underline,
  List,
} from "ckeditor5";

import translations from "ckeditor5/translations/es.js";

import "ckeditor5/ckeditor5.css";
import { FileController } from "@/controllers/FileController";
import { ComunicadoData } from "@/dtos/Comunicado/ComunicadoData";
import { useNavigate } from "react-router-dom";
import { ObtenerInitPathName } from "@/common/FuncionesComunesUsuario";

const CrearComunicadoDirector = () => {
  const { isLoading } = useAuth();
  const [loadingFull, setLoadingFull] = React.useState<boolean>(true);
  const initPathName: string = ObtenerInitPathName();
  const [tipoComunicado, setTipoComunicado] = useState("");
  const [tiposComunicadoSelect, setTiposComunicadoSelect] = useState<
    { key: number; text: string }[]
  >([]);
  const [nivel, setNivel] = useState("");
  const [nivelesSelect, setNivelesSelect] = useState<
    { key: number; text: string }[]
  >([]);
  const [enviarATodosMenores, setEnviarATodosMenores] = useState(true);
  const [menoresSelect, setMenoresSelect] = useState<
    { id: number; nombreMenor: string; nombreApoderado: string }[]
  >([]);
  const [menoresSeleccionados, setMenoresSeleccionados] = useState<number[]>(
    []
  );
  const [mostrarSeleccionMenores, setMostrarSeleccionMenores] = useState(false);
  const [enviarPorCorreo, setEnviarPorCorreo] = useState(false);
  const [asunto, setAsunto] = useState("");
  const [textoComunicado, setTextoComunicado] = useState("");
  const [archivoPDF, setArchivoPDF] = useState<File | null>(null);
  const [step, setStep] = useState(1);
  const [isErrorConfirmar, setIsErrorConfirmar] = useState<boolean>(true);
  const navigate = useNavigate();
  const comunicadoController = new ComunicadoController();
  const menorController = new MenorController();
  const fileController = new FileController();

  useEffect(() => {
    setLoadingFull(true);
    const fetchTiposComunicados = async () => {
      if (!isLoading) {
        try {
          const niveles = await comunicadoController.getNivelesByEducador();
          if (niveles) {
            setNivelesSelect(
              niveles.map((nivel: { key: number; text: string }) => ({
                key: nivel.key,
                text: nivel.text,
              }))
            );
          }
          const tiposComunicado =
            await comunicadoController.getTiposComunicado();
          if (tiposComunicado) {
            setTiposComunicadoSelect(
              tiposComunicado.map((tipo: { key: number; text: string }) => ({
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

    fetchTiposComunicados();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  useEffect(() => {
    setMostrarSeleccionMenores(false);
    setMenoresSeleccionados([]);
    const fetchMenores = async () => {
      if (nivel != "") {
        setLoadingFull(true);
        try {
          const menores =
            await menorController.getSelectMenoresApoderadoByIdNivel(
              Number(nivel)
            );
          if (menores) {
            setMenoresSelect(
              menores.map(
                (menor: {
                  id: number;
                  nombreMenor: string;
                  nombreApoderado: string;
                }) => ({
                  id: menor.id,
                  nombreMenor: menor.nombreMenor,
                  nombreApoderado: menor.nombreApoderado,
                })
              )
            );
          }
          setEnviarATodosMenores(true);
          setLoadingFull(false);
        } catch (error) {
          setLoadingFull(false);
          console.error("Error fetching perfil:", error);
        }
      }
    };

    fetchMenores();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nivel]);

  const handleCheckboxChange = (id: number) => {
    setMenoresSeleccionados((prev) =>
      prev.includes(id)
        ? prev.filter((menorId) => menorId !== id)
        : [...prev, id]
    );
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setArchivoPDF(event.target.files[0]);
    }
  };

  const handleLimpiarFile = () => {
    setArchivoPDF(null);
    document.getElementById("file")!.nodeValue = "";
    (document.getElementById("file") as HTMLInputElement).value = "";
  };

  const handleEnviarComunicado = async () => {
    try {
      setLoadingFull(true);
      let idArchivo: number | null = null;
      if (archivoPDF) {
        if (archivoPDF) {
          idArchivo = await fileController.uploadFile(archivoPDF);
        }
      }
      const requestData = new ComunicadoData(
        Number(tipoComunicado),
        Number(nivel),
        asunto,
        textoComunicado,
        enviarATodosMenores,
        menoresSeleccionados,
        idArchivo
      );
      const enviado = await comunicadoController.enviarComunicado(requestData);
      setIsErrorConfirmar(!enviado);
    } catch (error) {
      console.error("Error enviando comunicado:", error);
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
      navigate(`${initPathName}/comunicados/home`);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigate(-1);
    }
  };

  return (
    <Spin spinning={loadingFull}>
      <div className="p-4 sm:mx-16 md:mx-28 lg:mx-40 xl:mx-64">
        {step === 1 && (
          <div>
            <h1 className="text-xl font-bold mb-2">Nuevo Mensaje</h1>
            <div className="border border-gray-300 rounded-lg p-2 mb-2 text-sm bg-gray-200">
              <span>
                <strong>Redacta y Envía Mensajes a los Apoderados.</strong>
                <br />
                Haz click en <strong>"Nuevo"</strong> para redactar un mensaje y
                luego en <strong>"Aceptar".</strong>
              </span>
            </div>

            {/* Tipo de comunicado */}
            <div className="mb-2">
              <label className="block font-semibold mb-1">
                Tipo de Mensaje
              </label>
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

            <div className="mb-2">
              <label className="block font-semibold mb-1">Nivel</label>
              <select
                value={nivel}
                onChange={(e) => setNivel(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 w-full"
              >
                <option value="">Seleccionar Nivel</option>
                {nivelesSelect.map((nivel) => (
                  <option key={nivel.key} value={nivel.key}>
                    {nivel.text}
                  </option>
                ))}
              </select>
            </div>

            {/* Check de enviar a todos */}
            {nivel != "" && (
              <div className="mb-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={enviarATodosMenores}
                    onChange={(e) => setEnviarATodosMenores(e.target.checked)}
                    className="mr-2"
                  />
                  <p className="text-xs">
                    Enviar a todos los apoderados de menores del nivel
                  </p>
                </label>
              </div>
            )}

            {/* Botón para seleccionar menores */}
            {nivel != "" && !enviarATodosMenores && (
              <div className="mb-2">
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
                    <h2 className="font-semibold mb-2">
                      Selecciona los menores:
                    </h2>
                    {menoresSelect.map((menor) => (
                      <label key={menor.id} className="flex items-center mb-2">
                        <input
                          type="checkbox"
                          checked={menoresSeleccionados.includes(menor.id)}
                          onChange={() => handleCheckboxChange(menor.id)}
                          className="mr-2 text-sm"
                        />
                        {menor.nombreMenor} - Apoderado: {menor.nombreApoderado}
                      </label>
                    ))}
                  </div>
                )}

                {/* Mostrar lista de seleccionados */}
                {menoresSeleccionados.length > 0 && (
                  <div className="mt-4">
                    <h2 className="font-semibold">Menores seleccionados:</h2>
                    <ul className="list-disc list-inside">
                      {menoresSelect
                        .filter((menor) =>
                          menoresSeleccionados.includes(menor.id)
                        )
                        .map((menor) => (
                          <li key={menor.id}>
                            {menor.nombreMenor} - Apoderado:{" "}
                            {menor.nombreApoderado}
                          </li>
                        ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Check de enviar al correo */}
            <div className="mb-2">
              <del>
                <label className="flex items-center text-gray-500">
                  <input
                    type="checkbox"
                    checked={enviarPorCorreo}
                    onChange={(e) => setEnviarPorCorreo(e.target.checked)}
                    className="mr-2"
                    disabled={true}
                  />
                  Enviar al correo del apoderado
                </label>
              </del>
            </div>

            {/* Título del comunicado */}
            <div className="mb-2">
              <label className="block font-semibold mb-1">Asunto</label>
              <input
                type="text"
                value={asunto}
                onChange={(e) => setAsunto(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 w-full"
              />
            </div>

            {/* Texto del comunicado */}
            <div className="mb-2">
              <label className="block font-semibold mb-1">Mensaje</label>
              <CKEditor
                editor={ClassicEditor}
                config={{
                  toolbar: {
                    items: [
                      "undo",
                      "redo",
                      "|",
                      "bold",
                      "italic",
                      "underline",
                      "strikethrough",
                      "subscript",
                      "superscript",
                      "code",
                      "removeFormat",
                      "|",
                      "fontSize",
                      "fontFamily",
                      "fontColor",
                      "fontBackgroundColor",
                      "|",
                      "horizontalLine",
                      "insertTable",
                      "highlight",
                      "blockQuote",
                      "|",
                      "alignment",
                      "|",
                      "bulletedList",
                      "|",
                      "numberedList",
                      "|",
                      "outdent",
                      "indent",
                    ],
                  },
                  plugins: [
                    AccessibilityHelp,
                    Alignment,
                    Autoformat,
                    Autosave,
                    BalloonToolbar,
                    BlockQuote,
                    Bold,
                    Code,
                    Essentials,
                    FontBackgroundColor,
                    FontColor,
                    FontFamily,
                    FontSize,
                    GeneralHtmlSupport,
                    Highlight,
                    HorizontalLine,
                    Indent,
                    IndentBlock,
                    Italic,
                    Paragraph,
                    RemoveFormat,
                    SelectAll,
                    Strikethrough,
                    Subscript,
                    Superscript,
                    Table,
                    TableCaption,
                    TableCellProperties,
                    TableColumnResize,
                    TableProperties,
                    TableToolbar,
                    TextTransformation,
                    Underline,
                    Undo,
                    List,
                  ],
                  balloonToolbar: ["bold", "italic"],
                  fontFamily: {
                    supportAllValues: true,
                  },
                  fontSize: {
                    options: [10, 12, 14, "default", 18, 20, 22],
                    supportAllValues: true,
                  },
                  language: "es",
                  placeholder: "Escribe el contenido del comunicado aqui!",
                  htmlSupport: {
                    allow: [
                      {
                        name: /^.*$/,
                        attributes: true,
                        classes: true,
                      },
                    ],
                  },
                  table: {
                    contentToolbar: [
                      "tableColumn",
                      "tableRow",
                      "mergeTableCells",
                      "tableProperties",
                      "tableCellProperties",
                    ],
                  },
                  translations: [translations],
                }}
                data={textoComunicado}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onChange={(_event: any, editor: any) => {
                  setTextoComunicado(editor.getData());
                }}
              />
            </div>

            <div className="mb-2">
              <div className="mb-2">
                <label className="block font-semibold mb-1">Adjuntar PDF</label>
                <div className="flex justify-start mb-2">
                  <button
                    onClick={handleLimpiarFile}
                    className="bg-gray-800 text-xs text-white px-4 py-2 rounded hover:bg-gray-900 disabled:bg-gray-600 w-1/3"
                    disabled={archivoPDF == null}
                  >
                    Limpiar archivo
                  </button>
                </div>
                <input
                  type="file"
                  id="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none py-2"
                />
              </div>
            </div>

            {/* Botón enviar comunicado */}
            <button
              onClick={handleNextStep}
              className="bg-blue-600 disabled:bg-blue-300 text-white px-4 py-2 rounded hover:bg-blue-700 w-full h-12"
              disabled={
                tipoComunicado == "" ||
                nivel == "" ||
                (!enviarATodosMenores && menoresSeleccionados.length < 1) ||
                asunto.trim() == "" ||
                textoComunicado.trim() == ""
              }
            >
              Aceptar
            </button>
          </div>
        )}
        {step === 2 && (
          <div className="text-center">
            <h2 className="text-xl font-bold mb-4">¡Confirma el Envío!</h2>
            <p className="mb-4">
              Haz click en <strong>"Aceptar"</strong>
              <br />
              para <strong>Confirmar el Envío</strong>.
            </p>
            <div className="border border-gray-300 rounded-lg p-4 mb-4 bg-white">
              <p className="text-center font-semibold">
                ¿Deseas confirmar el Envío?
              </p>
            </div>
            <button
              onClick={() => handleEnviarComunicado()}
              className="w-full bg-figma-blue-button text-white py-2 rounded-lg hover:bg-blue-700"
            >
              Aceptar
            </button>
            <button
              onClick={() => handlePrevStep()}
              className="w-full outline outline-1 outline-figma-blue-button text-figma-blue-button bg-white transition-colors py-2 mt-4 font-semibold rounded-lg hover:outline-none hover:bg-figma-blue-button hover:text-white"
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
                  className="w-full bg-figma-blue-button text-white py-2 rounded-lg hover:bg-blue-700"
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
                  Envío
                  <br />
                  Confirmado
                </p>
                <button
                  onClick={handleNextStep}
                  className="w-full bg-figma-blue-button text-white py-2 rounded-lg hover:bg-blue-700"
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

export default CrearComunicadoDirector;
