export class UpdatePerfilDto {
  email: string;
  phone: string;
  address: string;

  constructor(email: string, phone: string, address: string) {
    this.email = email;
    this.phone = phone;
    this.address = address;
  }
}
