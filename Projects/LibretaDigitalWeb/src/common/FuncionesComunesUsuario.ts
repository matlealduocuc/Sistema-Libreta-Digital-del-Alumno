import { AuthorizedUserDto } from "@/dtos/Auth/AuthorizedUserDto";
import { useAuth } from "@/hooks/useAuth";

export const ObtenerNombreCompletoJoined = (
  persona: AuthorizedUserDto["persona"] | null
) => {
  const nombreCompletoLista = [];
  if (!persona) return "";
  nombreCompletoLista.push(persona.primerNombre);
  if (persona.segundoNombre && persona.segundoNombre !== "") {
    nombreCompletoLista.push(persona.segundoNombre);
  }
  nombreCompletoLista.push(persona.apellidoP);
  if (persona.apellidoM && persona.apellidoM !== "") {
    nombreCompletoLista.push(persona.apellidoM);
  }
  return nombreCompletoLista.join(" ");
};

export const ObtenerInitPathName = () => {
  const { data, isLoading } = useAuth();
  let initPathName: string = "";
  if (!isLoading && data) {
    switch (data.rol) {
      case "apoderado":
        initPathName = "/apoderado";
        break;
      case "educador":
        initPathName = "/educador";
        break;
      case "director":
        initPathName = "/director";
        break;
      default:
        initPathName = "/";
        break;
    }
  }

  return initPathName;
};

export const ObtenerRolUser = () => {
  const { data, isLoading } = useAuth();

  if (!isLoading && data) {
    return data.rol;
  }
}
