import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SelecaoDiasPage } from './selecao-dias.page';

const routes: Routes = [
  {
    path: '',
    component: SelecaoDiasPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SelecaoDiasPage]
})
export class SelecaoDiasPageModule {}
