import { AuthorizedUserDto } from "@/dtos/Auth/AuthorizedUserDto";

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
