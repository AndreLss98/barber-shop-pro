import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FotosDocumentoPage } from './fotos-documento.page';

const routes: Routes = [
  {
    path: '',
    component: FotosDocumentoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FotosDocumentoPage]
})
export class FotosDocumentoPageModule {}
