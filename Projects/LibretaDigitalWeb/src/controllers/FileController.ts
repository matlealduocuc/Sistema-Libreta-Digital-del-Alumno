import { FileService } from "@/services/FileService";

export class FileController {
  private _fileService: FileService;
  constructor() {
    this._fileService = new FileService();
  }

  async uploadFile(file: File) {
    try {
      const response = await this._fileService.uploadFile(file);
      console.log("Archivo subido exitosamente:", response);
      return response;
    } catch (error) {
      console.error("Error al subir el archivo:", error);

      throw error;
    }
  }

  async fetchFile(idFile: number) {
    try {
      const files = await this._fileService.getFile(idFile);
      return files;
    } catch (error) {
      console.error("Error al obtener el archivo:", error);
      throw error;
    }
  }
}
