import { Transform } from 'class-transformer';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class LoginRutDto {
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(7)
  run: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @MaxLength(1)
  dv: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(4)
  password: string;
}
