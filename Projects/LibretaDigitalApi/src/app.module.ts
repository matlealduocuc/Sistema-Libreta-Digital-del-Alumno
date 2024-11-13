import { Module } from '@nestjs/common';
import { MenorModule } from './menor/menor.module';
import { AuthModule } from './auth/auth.module';
import { UsuarioModule } from './usuario/usuario.module';
import { PersonaModule } from './persona/persona.module';
import { ComunicadoModule } from './comunicado/comunicado.module';
import { NivelModule } from './nivel/nivel.module';

@Module({
  imports: [
    MenorModule,
    AuthModule,
    UsuarioModule,
    PersonaModule,
    ComunicadoModule,
    NivelModule,
  ],
})
export class AppModule {}
