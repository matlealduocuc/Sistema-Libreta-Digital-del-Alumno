import { Footer } from "antd/es/layout/layout";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { NavMenu } from "@/components/NavMenu";
import { useAuth } from "@/hooks/useAuth";
import React, { useEffect } from "react";
import { Spin } from "antd";

export const AppLayout = () => {
  const { isError, isLoading } = useAuth();
  const [loadingLayout, setLoadingLayout] = React.useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoadingLayout(isLoading);
    if (isError) return navigate("/login");
  }, [isLoading, isError, navigate]);

  return (
    <Spin spinning={loadingLayout}>
      <header className="bg-gray-800 py-5">
        <div className="sm:max-w-screen-sm lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-center">
          <div className="w-32">
            <Link to={"/"}>
              <Logo />
            </Link>
          </div>
          <NavMenu />
        </div>
      </header>

      <section className="max-w-screen-sm lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl mx-auto max-sm:mt-0 mt-10 p-5">
        <Outlet />
      </section>

      <Footer className="py-5">
        <div className="text-center">
          Libreta Digital del Alumno ©{new Date().getFullYear()} Created by
          grupo 6.
          <a href="" target="_blank" rel="noopener noreferrer"></a>
        </div>
      </Footer>
    </Spin>
  );
};
