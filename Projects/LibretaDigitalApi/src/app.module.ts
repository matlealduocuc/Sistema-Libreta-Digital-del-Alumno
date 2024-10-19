import { Module } from '@nestjs/common';
import { MenorModule } from './menor/menor.module';
import { GradoModule } from './grado/grado.module';
import { AuthModule } from './auth/auth.module';
import { UsuarioModule } from './usuario/usuario.module';
import { PersonaModule } from './persona/persona.module';

@Module({
  imports: [MenorModule, GradoModule, AuthModule, UsuarioModule, PersonaModule],
})
export class AppModule {}
