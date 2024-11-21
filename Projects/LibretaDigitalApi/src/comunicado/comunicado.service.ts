import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ComunicadoService {
  constructor(private readonly prisma: PrismaService) {}

  // async getComunicadosByIdGrado(idGrado: number) {
  //   return await this.prisma.lda_comunicado.findMany({
  //     where: {
  //       lda_comunicado_entities: {
  //         every: {
  //           lda_educador: {
  //             iden_persona: idPersona,
  //           },
  //           flag_activo: true,
  //           flag_eliminado: false,
  //         },
  //       },
  //     },
  //   });
  // }

  async getTiposComunicado() {
    return await this.prisma.lda_tipo_comunicado.findMany();
  }
}
