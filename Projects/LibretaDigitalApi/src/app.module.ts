import { Module } from '@nestjs/common';
import { MenorModule } from './menor/menor.module';
import { GradoModule } from './grado/grado.module';
import { AuthModule } from './auth/auth.module';
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  imports: [MenorModule, GradoModule, AuthModule, UsuarioModule],
})
export class AppModule {}
