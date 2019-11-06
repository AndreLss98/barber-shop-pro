import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SelfiePage } from './selfie.page';
import { CadastroSucessoComponent } from '../modals/cadastro-sucesso/cadastro-sucesso.component';

const routes: Routes = [
  {
    path: '',
    component: SelfiePage
  }
];

@NgModule({
  imports: [
    FormsModule,
    IonicModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SelfiePage, CadastroSucessoComponent],
  entryComponents: [CadastroSucessoComponent]
})
export class SelfiePageModule {}
