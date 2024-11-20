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
    return await this.prisma.menor.findMany({
      where: {
        iden_per_apoderado: idApoderado,
        flag_activo: true,
        flag_eliminado: false,
      },
      select: {
        id: true,
        per_persona: {
          select: {
            primerNombre: true,
            apellidoP: true,
            apellidoM: true,
            fech_nacimiento: true,
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
        per_persona_lda_menor_iden_per_apoderadoToper_persona: {
          select: {
            primerNombre: true,
            apellidoP: true,
            apellidoM: true,
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
    const getIdenVacunaMenor = await this.prisma.lda_vacuna_menor.findFirst({
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
        iden_vacuna_menor: getIdenVacunaMenor.iden_vacuna_menor,
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
    // return await this.prisma.menor.findMany({
    //   where: {
    //     iden_per_apoderado: idApoderado,
    //     flag_activo: true,
    //     flag_eliminado: false,
    //     per_persona_lda_menor_iden_per_apoderadoToper_persona: {
    //       flag_activo: true,
    //       flag_eliminado: false,
    //     },
    //   },
    //   select: {
    //     id: true,
    //     per_persona: {
    //       select: {
    //         primerNombre: true,
    //         apellidoP: true,
    //         apellidoM: true,
    //         fech_nacimiento: true,
    //       },
    //     },
    //     lda_nivel_menor: {
    //       where: {
    //         flag_activo: true,
    //         flag_eliminado: false,
    //         lda_nivel: {
    //           flag_activo: true,
    //           flag_eliminado: false,
    //         },
    //       },
    //       select: {
    //         lda_nivel: {
    //           select: {
    //             desc_nombre: true,
    //           },
    //         },
    //       },
    //     },
    //     lda_paseo_menor: {
    //       where: {
    //         lda_paseo: {
    //           flag_activo: true,
    //           flag_eliminado: false,
    //         },
    //       },
    //       select: {
    //         flag_autorizado: true,
    //         lda_paseo: {
    //           select: {
    //             desc_titulo: true,
    //             fech_inicio: true,
    //             hora_inicio: true,
    //             fech_fin: true,
    //             hora_fin: true,
    //           },
    //         },
    //       },
    //     },
    //   },
    // });
  }
}
