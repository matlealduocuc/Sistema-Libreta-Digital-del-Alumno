import { Module } from '@nestjs/common';
import { MenorModule } from './menor/menor.module';
import { AuthModule } from './auth/auth.module';
import { UsuarioModule } from './usuario/usuario.module';
import { PersonaModule } from './persona/persona.module';
import { ComunicadoModule } from './comunicado/comunicado.module';
import { NivelModule } from './nivel/nivel.module';
import { VacunaModule } from './vacuna/vacuna.module';
import { PaseoModule } from './paseo/paseo.module';
import { ReunionApoderadoModule } from './reunion-apoderado/reunion-apoderado.module';
import { ItinerarioModule } from './itinerario/itinerario.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { FileModule } from './file/file.module';
import { SalaModule } from './sala/sala.module';

@Module({
  imports: [
    MenorModule,
    AuthModule,
    UsuarioModule,
    PersonaModule,
    ComunicadoModule,
    NivelModule,
    VacunaModule,
    PaseoModule,
    ReunionApoderadoModule,
    ItinerarioModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    FileModule,
    SalaModule,
  ],
})
export class AppModule {}
