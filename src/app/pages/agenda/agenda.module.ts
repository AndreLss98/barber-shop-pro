import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ComponentsModule } from './../../components/components.module';

import { AgendaPage } from './agenda.page';
import { MesAgendaComponent } from 'src/app/components/popovers/mes-agenda/mes-agenda.component';

const routes: Routes = [
  {
    path: '',
    component: AgendaPage
  }
];

@NgModule({
  imports: [
    IonicModule,
    FormsModule,
    CommonModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AgendaPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [ MesAgendaComponent ]
})
export class AgendaPageModule {}
