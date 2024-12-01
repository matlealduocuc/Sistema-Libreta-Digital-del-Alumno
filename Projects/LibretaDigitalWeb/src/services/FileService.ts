import api from "@/lib/axios";

export class FileService {
  private path = "/file";

  async uploadFile(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    const response = await api.post(`${this.path}/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  }

  async getFile(idFile: number) {
    const response = await api.get(`${this.path}/get/${idFile}`);
    response.data.url = `${import.meta.env.VITE_API_URL}/${response.data.url}`;
    return response.data;
  }
}
