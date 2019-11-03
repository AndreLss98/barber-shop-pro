import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ItemAgendaComponent } from './item-agenda/item-agenda.component';

@NgModule({
  declarations: [
    ItemAgendaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  exports: [
    ItemAgendaComponent
  ]
})
export class ComponentsModule { }
