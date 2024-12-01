import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class FileService {
  constructor(private readonly prisma: PrismaService) {}

  async uploadFile(filePath: string, fileName: string) {
    const upload = await this.prisma.lda_archivo.create({
      data: {
        desc_path: filePath,
        desc_nomb_original: fileName,
        fech_subida: new Date(),
      },
    });

    return upload.iden_archivo;
  }

  async getFile(id: number) {
    return await this.prisma.lda_archivo.findUnique({
      where: {
        iden_archivo: id,
      },
    });
  }
}
