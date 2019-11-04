import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PagamentosPage } from './pagamentos.page';
import { ComponentsModule } from 'src/app/components/components.module';

const routes: Routes = [
  {
    path: '',
    component: PagamentosPage
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
  declarations: [PagamentosPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PagamentosPageModule {}
