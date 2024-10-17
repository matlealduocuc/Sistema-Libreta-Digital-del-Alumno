import { PartialType } from '@nestjs/swagger';
import { CreatePersonaDto } from './create-persona.dto';

export class UpdatePersonaDto extends PartialType(CreatePersonaDto) {
  email: string;
  phone: string;
  address: string;
}
