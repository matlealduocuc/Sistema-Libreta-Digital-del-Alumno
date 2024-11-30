import {
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileService } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Multer } from 'multer';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (_req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const fileExt = extname(file.originalname);
          callback(null, `${file.fieldname}-${uniqueSuffix}${fileExt}`);
        },
      }),
      fileFilter: (_req, file, callback) => {
        if (file.mimetype === 'application/pdf') {
          callback(null, true);
        } else {
          callback(new Error('Only PDFs are allowed'), false);
        }
      },
    }),
  )
  async uploadFile(@UploadedFile() file: Multer.File) {
    const filePath = file.path;
    const fileName = file.originalname;
    const savedFile = this.fileService.uploadFile(filePath, fileName);

    return savedFile;
  }

  @Get('get/:id')
  async getFile(@Param('id') id: number) {
    const fileData = await this.fileService.getFile(+id);
    return {
      url: fileData.desc_path,
      nombre: fileData.desc_nomb_original,
    };
  }
}
