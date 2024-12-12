import { useAuth } from "@/hooks/useAuth";
import { Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ObtenerInitPathName } from "@/common/FuncionesComunesUsuario";
import { formatRut, validateDv } from "@/validators/rutValidator";
import { UsuarioController } from "@/controllers/UsuarioController";
import { NewApoderadoData } from "@/dtos/Usuario/NewApoderadoData";

const CrearApoderadoDirector = () => {
  const { isLoading } = useAuth();
  const [loadingFull, setLoadingFull] = React.useState<boolean>(false);
  const initPathName: string = ObtenerInitPathName();
  const [sexoSelect, setSexoSelect] = useState<{ key: number; text: string }[]>(
    []
  );
  const [nombre, setNombre] = useState("");
  const [apellidoP, setApellidoP] = useState("");
  const [apellidoM, setApellidoM] = useState("");
  const [fechNac, setFechNac] = useState("");
  const [sexo, setSexo] = useState("");
  const [rut, setRut] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState(1);
  const [isErrorConfirmar, setIsErrorConfirmar] = useState<boolean>(true);
  const [modalValidarMessage, setModalValidarMessage] = useState("");
  const navigate = useNavigate();
  const [isModalValidarOpen, setIsModalValidarOpen] = useState(false);
  const usuarioController = new UsuarioController();

  useEffect(() => {
    setLoadingFull(true);
    const fetchSexos = async () => {
      if (!isLoading) {
        try {
          const sexos = await usuarioController.getSexos();
          if (sexos) {
            setSexoSelect(
              sexos.map((sexo: { key: number; text: string }) => ({
                key: sexo.key,
                text: sexo.text,
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

    fetchSexos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const handleCrearApoderado = async () => {
    try {
      setLoadingFull(true);
      const fechaNacDate = new Date(fechNac);
      fechaNacDate.setMinutes(
        fechaNacDate.getMinutes() - fechaNacDate.getTimezoneOffset()
      );
      const requestData = new NewApoderadoData(
        nombre,
        apellidoP,
        apellidoM,
        new Date(fechaNacDate),
        Number(sexo),
        rut.replace(/\./g, ""),
        password
      );
      const enviado = await usuarioController.crearNuevoApoderado(requestData);
      setIsErrorConfirmar(!enviado);
    } catch (error) {
      console.error("Error creando apoderado:", error);
      setIsErrorConfirmar(true);
    } finally {
      setStep(3);
      setLoadingFull(false);
    }
  };

  const validateAndNextStep = () => {
    const [run, dv] = rut.split("-");
    const runLimpio = run.replace(/\./g, "");
    if (!validateDv(runLimpio, dv)) {
      setModalValidarMessage("Rut inválido");
      setIsModalValidarOpen(true);
    } else {
      if (password.length < 4) {
        setModalValidarMessage(
          "La contraseña debe tener un minimo de 4 caracteres"
        );
        setIsModalValidarOpen(true);
      } else {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const selectedDate = new Date(fechNac);
        selectedDate.setMinutes(
          selectedDate.getMinutes() + selectedDate.getTimezoneOffset()
        );
        if (selectedDate >= today) {
          setModalValidarMessage(
            "La fecha de nacimiento debe ser anterior a hoy"
          );
          setIsModalValidarOpen(true);
        } else {
          handleNextStep();
        }
      }
    }
  };

  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      navigate(`${initPathName}`);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigate(-1);
    }
  };

  useEffect(() => {
    const formattedRut = formatRut(rut);
    setRut(formattedRut);
  }, [rut]);

  return (
    <Spin spinning={loadingFull}>
      <div className="p-4 sm:mx-16 md:mx-28 lg:mx-40 xl:mx-64">
        {step === 1 && (
          <div>
            <h1 className="text-xl font-bold mb-2">Nuevo Apoderado</h1>
            <div className="border border-gray-300 rounded-lg p-2 mb-2 text-sm bg-gray-200">
              <span>
                <strong>Genera un nuevo Apoderado.</strong>
                <br />
                Haz click en <strong>"Nuevo"</strong> para crear un apoderado y
                que pueda acceder al sistema, luego apreta{" "}
                <strong>"Aceptar".</strong>
              </span>
            </div>

            <div className="mb-2">
              <label className="block font-semibold mb-1">Nombre</label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 w-full"
              />
            </div>
            <div className="mb-2">
              <label className="block font-semibold mb-1">
                Apellido Paterno
              </label>
              <input
                type="text"
                value={apellidoP}
                onChange={(e) => setApellidoP(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 w-full"
              />
            </div>
            <div className="mb-2">
              <label className="block font-semibold mb-1">
                Apellido Materno
              </label>
              <input
                type="text"
                value={apellidoM}
                onChange={(e) => setApellidoM(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 w-full"
              />
            </div>
            <div className="mb-2">
              <label className="font-semibold flex justify-start">
                Fecha de Nacimiento
              </label>
              <input
                type="date"
                value={fechNac}
                onChange={(e) => setFechNac(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 w-full"
              />
            </div>
            <div className="mb-2">
              <label className="block font-semibold mb-1">Sexo</label>
              <select
                value={sexo}
                onChange={(e) => setSexo(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 w-full"
              >
                <option value="">Seleccionar Sexo</option>
                {sexoSelect.map((sexo) => (
                  <option key={sexo.key} value={sexo.key}>
                    {sexo.text}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-2">
              <label className="block font-semibold mb-1">Rut</label>
              <input
                type="text"
                value={rut}
                onChange={(e) => setRut(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 w-full"
              />
            </div>
            <div className="mb-2">
              <label className="block font-semibold mb-1">Contraseña</label>
              <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 w-full"
              />
            </div>

            <button
              onClick={validateAndNextStep}
              className="bg-purple-600 disabled:bg-purple-300 text-white px-4 py-2 rounded hover:bg-purple-700 w-full h-12"
              disabled={
                nombre == null ||
                nombre == "" ||
                apellidoP == null ||
                apellidoP == "" ||
                apellidoM == null ||
                apellidoM == "" ||
                fechNac == null ||
                fechNac == "" ||
                sexo == null ||
                sexo == "" ||
                rut == null ||
                rut == "" ||
                password == null ||
                password == ""
              }
            >
              Aceptar
            </button>
          </div>
        )}
        {step === 2 && (
          <div className="text-center">
            <h2 className="text-xl font-bold mb-4">¡Confirma la creación!</h2>
            <p className="mb-4">
              Haz click en <strong>"Aceptar"</strong>
              <br />
              para <strong>Crear el Apoderado</strong>.
            </p>
            <div className="border border-gray-300 rounded-lg p-4 mb-4 bg-white">
              <p className="text-center font-semibold">
                ¿Deseas crear el Apoderado?
              </p>
            </div>
            <button
              onClick={() => handleCrearApoderado()}
              className="w-full bg-figma-purple text-white py-2 rounded-lg hover:bg-purple-700"
            >
              Aceptar
            </button>
            <button
              onClick={() => handlePrevStep()}
              className="w-full outline outline-1 outline-figma-purple text-figma-purple bg-white transition-colors py-2 mt-4 font-semibold rounded-lg hover:outline-none hover:bg-figma-purple hover:text-white"
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
                  className="w-full bg-figma-purple text-white py-2 rounded-lg hover:bg-purple-700"
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
                  Apoderado
                  <br />
                  Creado
                </p>
                <button
                  onClick={handleNextStep}
                  className="w-full bg-figma-purple text-white py-2 rounded-lg hover:bg-purple-700"
                >
                  Aceptar
                </button>
              </div>
            )}
          </div>
        )}

        {isModalValidarOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-lg">
              <p>{modalValidarMessage}</p>
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => setIsModalValidarOpen(false)}
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

export default CrearApoderadoDirector;
