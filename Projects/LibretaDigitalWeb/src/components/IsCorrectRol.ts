import { useNavigate } from "react-router-dom";

const IsCorrectRol = (rol: string) => {
  const navigate = useNavigate();

  const pathRol = location.pathname.split("/")[0].trim().toLowerCase();
  rol = rol.trim().toLowerCase();
  console.log(pathRol);
  if (pathRol == rol) {
    return true;
  } else {
    navigate("/libretaRedirect");
    return false;
  }
};

export default IsCorrectRol;
