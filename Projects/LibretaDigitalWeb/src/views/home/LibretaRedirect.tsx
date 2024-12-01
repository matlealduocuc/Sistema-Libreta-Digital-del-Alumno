import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const LibretaRedirect = () => {
  const { data, isLoading } = useAuth();

  const navigate = useNavigate();

  if (!isLoading && data) {
    const handleCerrarSesion = () => {
      localStorage.removeItem("AUTH_USER");
      navigate("/login");
    };
    switch (data.rol) {
      case "apoderado":
        navigate("/apoderado");
        break;
      case "educador":
        navigate("/educador");
        break;
      case "director":
        navigate("/director");
        break;
      default:
        handleCerrarSesion();
        navigate("/");
        break;
    }
  }

  return (
    <div className="flex justify-center align-middle">
      <p>Cargando...</p>
    </div>
  );
};

export default LibretaRedirect;
