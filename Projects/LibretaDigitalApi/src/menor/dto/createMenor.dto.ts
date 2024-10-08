import { IsNumber, IsString, Min, MinLength } from 'class-validator';

export class CreateMenorDTO {
  @IsString()
  @MinLength(1)
  nombre: string;
  @IsString()
  @MinLength(1)
  apellidoP: string;
  @IsString()
  apellidoM: string;
  @IsNumber()
  @Min(0)
  edad: number;
}
