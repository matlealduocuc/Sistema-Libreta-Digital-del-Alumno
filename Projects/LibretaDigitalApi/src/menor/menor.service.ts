import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class MenorService {
  constructor(private prisma: PrismaService) {}

  async getMenores() {
    const menores = await this.prisma.menor.findMany();
    return menores;
  }

  getMenor(id: number) {
    return this.prisma.menor.findUnique({
      where: { id: id },
    });
  }

  async getSelectMenoresApoderadoByIdNivel(idNivel: number) {
    return await this.prisma.menor.findMany({
      where: {
        lda_nivel_menor: {
          every: {
            iden_nivel: idNivel,
            flag_activo: true,
            flag_eliminado: false,
          },
        },
        flag_activo: true,
        flag_eliminado: false,
      },
      select: {
        id: true,
        per_persona: {
          select: {
            primerNombre: true,
            segundoNombre: true,
            apellidoP: true,
            apellidoM: true,
          },
        },
        per_persona_lda_menor_iden_per_apoderadoToper_persona: {
          select: {
            primerNombre: true,
            segundoNombre: true,
            apellidoP: true,
            apellidoM: true,
            flag_activo: true,
            flag_eliminado: true,
          },
        },
        per_persona_lda_menor_iden_per_apoderado_supToper_persona: {
          select: {
            primerNombre: true,
            segundoNombre: true,
            apellidoP: true,
            apellidoM: true,
            flag_activo: true,
            flag_eliminado: true,
          },
        },
      },
    });
  }

  async getMenoresVacunasByApoderado(idApoderado: number) {
    return await this.prisma.lda_vacuna.findMany({
      where: {
        nmro_agno: {
          equals: new Date().getFullYear(),
        },
        lda_vacuna_menor: {
          some: {
            lda_menor: {
              iden_per_apoderado: idApoderado,
              flag_activo: true,
              flag_eliminado: false,
            },
          },
        },
      },
      select: {
        iden_vacuna: true,
        desc_nombre: true,
        fech_vacunacion: true,
        lda_vacuna_menor: {
          where: {
            lda_menor: {
              iden_per_apoderado: idApoderado,
              flag_activo: true,
              flag_eliminado: false,
            },
          },
          select: {
            flag_autorizado: true,
            lda_menor: {
              select: {
                id: true,
                per_persona: {
                  select: {
                    primerNombre: true,
                    segundoNombre: true,
                    apellidoP: true,
                    apellidoM: true,
                  },
                },
                lda_nivel_menor: {
                  where: {
                    flag_activo: true,
                    flag_eliminado: false,
                    lda_nivel: {
                      flag_activo: true,
                      flag_eliminado: false,
                    },
                  },
                  select: {
                    lda_nivel: {
                      select: {
                        desc_nombre: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  async getMenorVacunasByMenorAndApoderado(
    idMenor: number,
    idApoderado: number,
  ) {
    return await this.prisma.menor.findFirst({
      where: {
        id: idMenor,
        iden_per_apoderado: idApoderado,
        flag_activo: true,
        flag_eliminado: false,
        lda_vacuna_menor: {
          some: {
            lda_vacuna: {
              nmro_agno: {
                equals: new Date().getFullYear(),
              },
            },
          },
        },
      },
      select: {
        id: true,
        per_persona: {
          select: {
            primerNombre: true,
            apellidoP: true,
            apellidoM: true,
          },
        },
        lda_nivel_menor: {
          where: {
            flag_activo: true,
            flag_eliminado: false,
            lda_nivel: {
              flag_activo: true,
              flag_eliminado: false,
            },
          },
          select: {
            lda_nivel: {
              select: {
                desc_nombre: true,
              },
            },
          },
        },
        lda_vacuna_menor: {
          where: {
            lda_vacuna: {
              nmro_agno: {
                equals: new Date().getFullYear(),
              },
            },
          },
          select: {
            flag_autorizado: true,
            lda_vacuna: {
              select: {
                iden_vacuna: true,
                desc_nombre: true,
                fech_vacunacion: true,
              },
            },
          },
        },
      },
    });
  }

  async autorizarVacunaMenor(
    idMenor: number,
    idVacuna: number,
    idApoderado: number,
  ) {
    const isApoderado = await this.prisma.menor.findFirst({
      where: {
        id: idMenor,
        iden_per_apoderado: idApoderado,
        flag_activo: true,
        flag_eliminado: false,
        per_persona_lda_menor_iden_per_apoderadoToper_persona: {
          flag_activo: true,
          flag_eliminado: false,
        },
      },
    });
    if (!isApoderado) {
      return false;
    }
    const getIden = await this.prisma.lda_vacuna_menor.findFirst({
      where: {
        iden_menor: idMenor,
        iden_vacuna: idVacuna,
      },
      select: {
        iden_vacuna_menor: true,
      },
    });
    const updated = await this.prisma.lda_vacuna_menor.update({
      data: {
        flag_autorizado: true,
      },
      where: {
        iden_vacuna_menor: getIden.iden_vacuna_menor,
      },
    });
    return updated;
  }

  async getMenoresPaseosByApoderado(idApoderado: number) {
    return await this.prisma.lda_paseo.findMany({
      where: {
        lda_paseo_menor: {
          some: {
            lda_menor: {
              iden_per_apoderado: idApoderado,
              flag_activo: true,
              flag_eliminado: false,
            },
          },
        },
      },
      select: {
        iden_paseo: true,
        desc_titulo: true,
        fech_inicio: true,
        fech_fin: true,
        lda_tipo_paseo: {
          select: {
            desc_tipo_paseo: true,
          },
        },
        lda_paseo_menor: {
          where: {
            lda_menor: {
              iden_per_apoderado: idApoderado,
              flag_activo: true,
              flag_eliminado: false,
            },
          },
          select: {
            flag_autorizado: true,
            lda_menor: {
              select: {
                id: true,
                per_persona: {
                  select: {
                    primerNombre: true,
                    segundoNombre: true,
                    apellidoP: true,
                    apellidoM: true,
                  },
                },
                lda_nivel_menor: {
                  where: {
                    flag_activo: true,
                    flag_eliminado: false,
                    lda_nivel: {
                      flag_activo: true,
                      flag_eliminado: false,
                    },
                  },
                  select: {
                    lda_nivel: {
                      select: {
                        desc_nombre: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  async getMenorPaseoByMenorPaseoAndApoderado(
    idMenor: number,
    idPaseo: number,
    idApoderado: number,
  ) {
    return await this.prisma.menor.findFirst({
      where: {
        id: idMenor,
        iden_per_apoderado: idApoderado,
        flag_activo: true,
        flag_eliminado: false,
        lda_paseo_menor: {
          some: {
            lda_paseo: {
              iden_paseo: {
                equals: idPaseo,
              },
            },
          },
        },
      },
      select: {
        per_persona: {
          select: {
            primerNombre: true,
            apellidoP: true,
            apellidoM: true,
          },
        },
        lda_nivel_menor: {
          where: {
            flag_activo: true,
            flag_eliminado: false,
            lda_nivel: {
              flag_activo: true,
              flag_eliminado: false,
            },
          },
          select: {
            lda_nivel: {
              select: {
                desc_nombre: true,
              },
            },
          },
        },
        lda_paseo_menor: {
          where: {
            lda_paseo: {
              iden_paseo: {
                equals: idPaseo,
              },
              flag_activo: true,
              flag_eliminado: false,
            },
          },
          select: {
            flag_autorizado: true,
            lda_paseo: {
              select: {
                desc_titulo: true,
                desc_descripcion: true,
                fech_inicio: true,
                fech_fin: true,
                lda_tipo_paseo: {
                  select: {
                    desc_tipo_paseo: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  async autorizarPaseoMenor(
    idMenor: number,
    idPaseo: number,
    idApoderado: number,
  ) {
    const isApoderado = await this.prisma.menor.findFirst({
      where: {
        id: idMenor,
        iden_per_apoderado: idApoderado,
        flag_activo: true,
        flag_eliminado: false,
        per_persona_lda_menor_iden_per_apoderadoToper_persona: {
          flag_activo: true,
          flag_eliminado: false,
        },
      },
    });
    if (!isApoderado) {
      return false;
    }
    const getIden = await this.prisma.lda_paseo_menor.findFirst({
      where: {
        iden_menor: idMenor,
        iden_paseo: idPaseo,
      },
      select: {
        iden_paseo_menor: true,
      },
    });
    const updated = await this.prisma.lda_paseo_menor.update({
      data: {
        flag_autorizado: true,
      },
      where: {
        iden_paseo_menor: getIden.iden_paseo_menor,
      },
    });
    return updated;
  }

  async getMenoresReunionesByApoderado(idApoderado: number) {
    return await this.prisma.lda_reunion.findMany({
      where: {
        lda_reunion_menor: {
          some: {
            lda_menor: {
              iden_per_apoderado: idApoderado,
              flag_activo: true,
              flag_eliminado: false,
            },
          },
        },
      },
      select: {
        iden_reunion: true,
        desc_titulo: true,
        fech_reunion: true,
        lda_sala: {
          select: {
            desc_nombre: true,
          },
        },
        lda_reunion_menor: {
          where: {
            lda_menor: {
              iden_per_apoderado: idApoderado,
              flag_activo: true,
              flag_eliminado: false,
            },
          },
          select: {
            flag_confirmado: true,
            lda_menor: {
              select: {
                id: true,
                per_persona: {
                  select: {
                    primerNombre: true,
                    segundoNombre: true,
                    apellidoP: true,
                    apellidoM: true,
                  },
                },
                lda_nivel_menor: {
                  where: {
                    flag_activo: true,
                    flag_eliminado: false,
                    lda_nivel: {
                      flag_activo: true,
                      flag_eliminado: false,
                    },
                  },
                  select: {
                    lda_nivel: {
                      select: {
                        desc_nombre: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  async getMenorReunionByMenorPaseoAndApoderado(
    idMenor: number,
    idReunion: number,
    idApoderado: number,
  ) {
    return await this.prisma.menor.findFirst({
      where: {
        id: idMenor,
        iden_per_apoderado: idApoderado,
        flag_activo: true,
        flag_eliminado: false,
        lda_reunion_menor: {
          some: {
            lda_reunion: {
              iden_reunion: {
                equals: idReunion,
              },
            },
          },
        },
      },
      select: {
        per_persona: {
          select: {
            primerNombre: true,
            apellidoP: true,
            apellidoM: true,
          },
        },
        lda_nivel_menor: {
          where: {
            flag_activo: true,
            flag_eliminado: false,
            lda_nivel: {
              flag_activo: true,
              flag_eliminado: false,
            },
          },
          select: {
            lda_nivel: {
              select: {
                desc_nombre: true,
              },
            },
          },
        },
        lda_reunion_menor: {
          where: {
            lda_reunion: {
              iden_reunion: {
                equals: idReunion,
              },
              flag_activo: true,
              flag_eliminado: false,
            },
          },
          select: {
            flag_confirmado: true,
            lda_reunion: {
              select: {
                desc_titulo: true,
                fech_reunion: true,
                lda_sala: {
                  select: {
                    desc_nombre: true,
                  },
                },
                lda_reunion_tema: {
                  where: {
                    flag_eliminado: false,
                  },
                  select: {
                    desc_tema: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  async confirmaReunionMenor(
    idMenor: number,
    idReunion: number,
    idApoderado: number,
  ) {
    const isApoderado = await this.prisma.menor.findFirst({
      where: {
        id: idMenor,
        iden_per_apoderado: idApoderado,
        flag_activo: true,
        flag_eliminado: false,
        per_persona_lda_menor_iden_per_apoderadoToper_persona: {
          flag_activo: true,
          flag_eliminado: false,
        },
      },
    });
    if (!isApoderado) {
      return false;
    }
    const getIden = await this.prisma.lda_reunion_menor.findFirst({
      where: {
        iden_menor: idMenor,
        iden_reunion: idReunion,
      },
      select: {
        iden_reunion_menor: true,
      },
    });
    const updated = await this.prisma.lda_reunion_menor.update({
      data: {
        flag_confirmado: true,
      },
      where: {
        iden_reunion_menor: getIden.iden_reunion_menor,
      },
    });
    return updated;
  }

  async getMenoresItinerariosByApoderado(idApoderado: number) {
    return await this.prisma.lda_itinerario.findMany({
      where: {
        lda_itinerario_menor: {
          some: {
            lda_menor: {
              iden_per_apoderado: idApoderado,
              flag_activo: true,
              flag_eliminado: false,
            },
          },
        },
      },
      select: {
        iden_itinerario: true,
        desc_titulo: true,
        fech_itinerario: true,
        flag_realizado: true,
        lda_itinerario_menor: {
          where: {
            lda_menor: {
              iden_per_apoderado: idApoderado,
              flag_activo: true,
              flag_eliminado: false,
            },
          },
          select: {
            flag_confirmado: true,
            lda_menor: {
              select: {
                id: true,
                per_persona: {
                  select: {
                    primerNombre: true,
                    segundoNombre: true,
                    apellidoP: true,
                    apellidoM: true,
                  },
                },
                lda_nivel_menor: {
                  where: {
                    flag_activo: true,
                    flag_eliminado: false,
                    lda_nivel: {
                      flag_activo: true,
                      flag_eliminado: false,
                    },
                  },
                  select: {
                    lda_nivel: {
                      select: {
                        desc_nombre: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  async getMenorItinerarioByMenorPaseoAndApoderado(
    idMenor: number,
    idItinerario: number,
    idApoderado: number,
  ) {
    return await this.prisma.menor.findFirst({
      where: {
        id: idMenor,
        iden_per_apoderado: idApoderado,
        flag_activo: true,
        flag_eliminado: false,
        lda_itinerario_menor: {
          some: {
            lda_itinerario: {
              iden_itinerario: {
                equals: idItinerario,
              },
            },
          },
        },
      },
      select: {
        per_persona: {
          select: {
            primerNombre: true,
            apellidoP: true,
            apellidoM: true,
          },
        },
        lda_nivel_menor: {
          where: {
            flag_activo: true,
            flag_eliminado: false,
            lda_nivel: {
              flag_activo: true,
              flag_eliminado: false,
            },
          },
          select: {
            lda_nivel: {
              select: {
                desc_nombre: true,
              },
            },
          },
        },
        lda_itinerario_menor: {
          where: {
            lda_itinerario: {
              iden_itinerario: {
                equals: idItinerario,
              },
              flag_activo: true,
              flag_eliminado: false,
            },
          },
          select: {
            flag_confirmado: true,
            lda_itinerario: {
              select: {
                desc_titulo: true,
                desc_descripcion: true,
                fech_itinerario: true,
                flag_realizado: true,
              },
            },
          },
        },
      },
    });
  }

  async confirmaItinerarioMenor(
    idMenor: number,
    idItinerario: number,
    idApoderado: number,
  ) {
    const isApoderado = await this.prisma.menor.findFirst({
      where: {
        id: idMenor,
        iden_per_apoderado: idApoderado,
        flag_activo: true,
        flag_eliminado: false,
        per_persona_lda_menor_iden_per_apoderadoToper_persona: {
          flag_activo: true,
          flag_eliminado: false,
        },
      },
    });
    if (!isApoderado) {
      return false;
    }
    const getIden = await this.prisma.lda_itinerario_menor.findFirst({
      where: {
        iden_menor: idMenor,
        iden_itinerario: idItinerario,
      },
      select: {
        iden_itinerario_menor: true,
      },
    });
    const updated = await this.prisma.lda_itinerario_menor.update({
      data: {
        flag_confirmado: true,
      },
      where: {
        iden_itinerario_menor: getIden.iden_itinerario_menor,
      },
    });
    return updated;
  }
}
