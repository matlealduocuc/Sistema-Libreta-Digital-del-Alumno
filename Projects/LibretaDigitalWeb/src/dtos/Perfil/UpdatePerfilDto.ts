export class UpdatePersonaDto {
  id: string;
  email: string | null;
  phone: string | null;
  address: string | null;

  constructor(id: string, email: string, phone: string, address: string) {
    this.id = id;
    this.email = email;
    this.phone = phone;
    this.address = address;
  }
}
