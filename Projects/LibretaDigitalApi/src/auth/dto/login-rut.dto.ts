import { IsString, MinLength } from "class-validator";

export class LoginRutDto {
    @IsString()
    @MinLength(7)
    run: string;

    @IsString()
    dv: string;

    @IsString()
    @MinLength(4)
    password: string;
}
