import { Logo } from "@/components/Logo";
import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
  return (
    <>
      <div className="bg-gray-800 min-h-screen">
        <div className="py-10 sm:py-16 lg:py-20 mx-auto w-[300px] sm:w-[450px]">
          <Logo />

          <div className="mt-10">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};
