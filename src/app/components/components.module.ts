import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ItemAgendaComponent } from './item-agenda/item-agenda.component';
import { MesAgendaComponent } from './popovers/mes-agenda/mes-agenda.component';

@NgModule({
  declarations: [
    MesAgendaComponent,
    ItemAgendaComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  exports: [
    MesAgendaComponent,
    ItemAgendaComponent,
  ]
})
export class ComponentsModule { }
