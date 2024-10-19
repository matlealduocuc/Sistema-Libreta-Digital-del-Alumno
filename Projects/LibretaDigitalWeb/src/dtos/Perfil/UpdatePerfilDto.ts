export class UpdatePersonaDto {
  id: number;
  email: string | null;
  phone: string | null;
  address: string | null;

  constructor(id: number, email: string, phone: string, address: string) {
    this.id = id;
    this.email = email;
    this.phone = phone;
    this.address = address;
  }
}
