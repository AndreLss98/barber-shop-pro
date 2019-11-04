import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HistoricoPage } from './historico.page';
import { ComponentsModule } from 'src/app/components/components.module';

const routes: Routes = [
  {
    path: '',
    component: HistoricoPage
  }
];

@NgModule({
  imports: [
    FormsModule,
    IonicModule,
    CommonModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HistoricoPage]
})
export class HistoricoPageModule {}
