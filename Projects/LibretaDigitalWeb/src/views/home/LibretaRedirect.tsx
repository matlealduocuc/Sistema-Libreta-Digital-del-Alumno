import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const LibretaRedirect = () => {
  const { data, isLoading } = useAuth();

  const navigate = useNavigate();

  if (!isLoading && data) {
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
        navigate("/");
        break;
    }
  }

  return (
    <div>
      <p>Cargando...</p>
    </div>
  );
};

export default LibretaRedirect;
