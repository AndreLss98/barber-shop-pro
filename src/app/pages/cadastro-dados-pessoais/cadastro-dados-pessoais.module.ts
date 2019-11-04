import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CadastroDadosPessoaisPage } from './cadastro-dados-pessoais.page';

const routes: Routes = [
  {
    path: '',
    component: CadastroDadosPessoaisPage
  }
];

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CadastroDadosPessoaisPage]
})
export class CadastroDadosPessoaisPageModule {}
