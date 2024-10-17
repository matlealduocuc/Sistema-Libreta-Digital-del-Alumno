export class LoginRutDto {
    run: string;
    dv: string;
    password: string;
    
    constructor(run: string, dv: string, password: string) {
        this.run = run;
        this.dv = dv;
        this.password = password;
    }
}
