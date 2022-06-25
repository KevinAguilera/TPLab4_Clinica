import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FechaPipe } from './fecha.pipe';
import { TurnoExistentePipe } from './turno-existente.pipe';
import { NombreUsuarioPipe } from './nombre-especialista.pipe';
import { FechaProgramadaPipe } from './fecha-programada.pipe';
import { FormatoHoraPipe } from './formato-hora.pipe';



@NgModule({
  declarations: [
    FechaPipe,
    TurnoExistentePipe,
    NombreUsuarioPipe,
    FechaProgramadaPipe,
    FormatoHoraPipe,
  ],
  imports: [
  ],
  exports:[    FechaPipe,
    TurnoExistentePipe,
    NombreUsuarioPipe,
    FechaProgramadaPipe,
    FormatoHoraPipe,
                    ]
})
export class PipesModule { }
