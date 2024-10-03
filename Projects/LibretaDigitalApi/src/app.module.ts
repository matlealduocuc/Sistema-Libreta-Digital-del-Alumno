import { Module } from '@nestjs/common';
import { AlumnoModule } from './alumno/alumno.module';
import { GradoModule } from './grado/grado.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AlumnoModule, GradoModule, AuthModule],
})
export class AppModule {}
