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
  ],
})
export class AppModule {}
