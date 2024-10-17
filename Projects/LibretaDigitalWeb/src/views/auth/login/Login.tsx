import { useForm } from "react-hook-form";
import { UserLoginForm } from "@/types/index";
import { ErrorMessage } from "@/components/ErrorMessage";
import { AuthController } from "@/controllers/AuthController";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { formatRut, validateDv } from "@/validators/rutValidator";
import React from "react";
import { Flex, Spin } from "antd";

export const Login = () => {
  const { setValue } = useForm<UserLoginForm>();
  const navigate = useNavigate();
  const [rut, setRut] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(true);
  const authController = new AuthController();
  const initialValues: UserLoginForm = {
    rut: "",
    password: "",
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm({ defaultValues: initialValues });

  useEffect(() => {
    if (rut !== "") {
      clearErrors("rut");
    }
    const formattedRut = formatRut(rut);
    setRut(formattedRut);
  }, [rut, setValue, clearErrors]);

  useEffect(() => {
    if (password !== "") {
      clearErrors("password");
    }
    setPassword(password);
  }, [password, setValue, clearErrors]);

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleLogin = async (formData: UserLoginForm) => {
    setLoading(true);
    const [run, dv] = formData.rut.split("-");
    const runLimpio = run.replace(/\./g, "");
    if (!validateDv(runLimpio, dv)) {
      if (errors.rut?.message != "Dígito verificador inválido") {
        setError("rut", {
          type: "manual",
          message: "Dígito verificador inválido",
        });
        setLoading(false);
        return;
      }
    }
    const isLoginValid = await authController.login(formData);
    if (isLoginValid) {
      navigate("/libreta");
    } else {
      setError("password", {
        type: "manual",
        message: "El rut o contraseña son incorrectos.",
      });
      setLoading(false);
      return;
    }
  };

  return (
    <>
      <Flex gap="middle" vertical>
        <Spin spinning={loading}>
          <form
            onSubmit={handleSubmit(handleLogin)}
            className="space-y-8 p-5 sm:p-10 bg-white"
            noValidate
          >
            <div className="flex flex-col gap-5">
              <label className="font-normal text-2xl">RUT</label>

              <input
                id="rut"
                type="text"
                placeholder="RUT"
                value={rut}
                onInput={(e) => setRut(e.currentTarget.value)}
                className="w-full p-3  border-gray-300 border"
                {...register("rut", {
                  required: "El RUT es obligatorio",
                })}
              />
              {errors.rut && <ErrorMessage>{errors.rut.message}</ErrorMessage>}
            </div>

            <div className="flex flex-col gap-5">
              <label className="font-normal text-2xl">Contraseña</label>

              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onInput={(e) => setPassword(e.currentTarget.value)}
                className="w-full p-3  border-gray-300 border"
                {...register("password", {
                  required: "La Contraseña es obligatoria",
                  minLength: {
                    value: 4,
                    message: "La contraseña debe tener al menos 4 caracteres",
                  },
                })}
              />
              {errors.password && (
                <ErrorMessage>{errors.password.message}</ErrorMessage>
              )}
            </div>

            <input
              type="submit"
              value="Iniciar Sesión"
              className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
            />
          </form>
        </Spin>
      </Flex>
    </>
  );
};
