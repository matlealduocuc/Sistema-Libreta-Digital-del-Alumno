// import { Logo } from "@/components/Logo";
import { useAuth } from "@/hooks/useAuth";
import { Spin } from "antd";
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export const AuthLayout = () => {
  const { isError, isLoading } = useAuth();
  const [loadingLayout, setLoadingLayout] = React.useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoadingLayout(isLoading);
    if (!isLoading && !isError) return navigate("/libreta");
  }, [isLoading, isError, navigate]);

  return (
    <Spin spinning={loadingLayout}>
      <div className="bg-white min-h-screen">
        <div className="py-10 sm:py-16 lg:py-20 mx-auto w-[300px] sm:w-[450px]">
          {/* <Logo /> */}
          <span className="flex justify-center text-2xl pt-3 pb-10 font-bold text-gray-800">Libreta Digital del Alumno</span>
          <span className="flex justify-center text-2xl font-bold text-black">Inicio de Sesión</span>

          <div className="mt-10">
            <Outlet />
          </div>
        </div>
      </div>
    </Spin>
  );
};
