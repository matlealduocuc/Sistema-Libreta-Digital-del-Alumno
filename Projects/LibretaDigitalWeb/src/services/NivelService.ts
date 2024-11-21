export class NivelService {
  async getNivelesByEducador(idPersona: number) {
    console.log(idPersona);
    return [
      {
        id: 1,
        nombre: "Nivel 1",
        cantidadMenores: 10,
      },
      {
        id: 2,
        nombre: "Nivel 2",
        cantidadMenores: 12,
      },
      {
        id: 3,
        nombre: "Nivel 3",
        cantidadMenores: 14,
      },
    ];
  }
}
