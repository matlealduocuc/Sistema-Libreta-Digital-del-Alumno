import { MenorService } from "@/services/MenorService";

export class MenorController {
  private _menorService: MenorService;
  constructor() {
    this._menorService = new MenorService();
  }

  async getSelectMenoresApoderadoByIdNivel(idNivel: number) {
    const menores = await this._menorService.getSelectMenoresApoderadoByIdNivel(
      idNivel
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const menoresReturn = menores.map((menor: any) => {
      const listNombreMenor = [];
      listNombreMenor.push(menor.per_persona.primerNombre);
      listNombreMenor.push(menor.per_persona.segundoNombre);
      listNombreMenor.push(menor.per_persona.apellidoP);
      listNombreMenor.push(menor.per_persona.apellidoM);
      const apoderado =
        menor.per_persona_lda_menor_iden_per_apoderadoToper_persona;
      const apoderadoSup =
        menor.per_persona_lda_menor_iden_per_apoderado_supToper_persona;
      const listNombrApoderado = [];
      if (apoderado && apoderado.flag_activo && !apoderado.flag_eliminado) {
        listNombrApoderado.push(apoderado.primerNombre);
        listNombrApoderado.push(apoderado.segundoNombre);
        listNombrApoderado.push(apoderado.apellidoP);
        listNombrApoderado.push(apoderado.apellidoM);
      } else if (
        apoderadoSup &&
        apoderadoSup.flag_activo &&
        !apoderadoSup.flag_eliminado
      ) {
        listNombrApoderado.push(apoderadoSup.primerNombre);
        listNombrApoderado.push(apoderadoSup.segundoNombre);
        listNombrApoderado.push(apoderadoSup.apellidoP);
        listNombrApoderado.push(apoderadoSup.apellidoM);
      } else {
        listNombrApoderado.push("Sin apoderado");
      }

      return {
        id: menor.id,
        nombreMenor: listNombreMenor.join(" "),
        nombreApoderado: listNombrApoderado.join(" "),
      };
    });
    return menoresReturn;
  }

  async getMenoresByApoderado() {
    return await this._menorService.getMenoresByApoderado();
  }

  async getMenoresVacunasByApoderado() {
    return await this._menorService.getMenoresVacunasByApoderado();
  }

  async getMenorVacunasByMenorAndApoderado(idMenor: number) {
    return await this._menorService.getMenorVacunasByMenorAndApoderado(idMenor);
  }

  async autorizarVacunaMenor(idMenor: number, idVacuna: number) {
    return await this._menorService.autorizarVacunaMenor(idMenor, idVacuna);
  }

  async getMenoresPaseosByApoderado() {
    return await this._menorService.getMenoresPaseosByApoderado();
  }

  async getMenorPaseoByMenorPaseoAndApoderado(
    idMenor: number,
    idPaseo: number
  ) {
    return await this._menorService.getMenorPaseoByMenorPaseoAndApoderado(
      idMenor,
      idPaseo
    );
  }

  async autorizarPaseoMenor(idMenor: number, idPaseo: number) {
    return await this._menorService.autorizarPaseoMenor(idMenor, idPaseo);
  }

  async getMenoresReunionesByApoderado() {
    return await this._menorService.getMenoresReunionesByApoderado();
  }

  async getMenorReunionByMenorPaseoAndApoderado(
    idMenor: number,
    idReunion: number
  ) {
    return await this._menorService.getMenorReunionByMenorPaseoAndApoderado(
      idMenor,
      idReunion
    );
  }

  async confirmaReunionMenor(idMenor: number, idReunion: number) {
    return await this._menorService.confirmaReunionMenor(idMenor, idReunion);
  }

  async getMenoresItinerariosByApoderado() {
    return await this._menorService.getMenoresItinerariosByApoderado();
  }

  async getMenorItinerarioByMenorPaseoAndApoderado(
    idMenor: number,
    idItinerario: number
  ) {
    return await this._menorService.getMenorItinerarioByMenorPaseoAndApoderado(
      idMenor,
      idItinerario
    );
  }

  async confirmaItinerarioMenor(idMenor: number, idItinerario: number) {
    return await this._menorService.confirmaItinerarioMenor(
      idMenor,
      idItinerario
    );
  }

  async getMenoresDataByApoderado() {
    return await this._menorService.getMenoresDataByApoderado();
  }
}
