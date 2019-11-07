import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RotaPage } from './rota.page';
import { MapComponent } from 'src/app/components/map/map.component';

const routes: Routes = [
  {
    path: '',
    component: RotaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RotaPage, MapComponent],
  entryComponents: [MapComponent]
})
export class RotaPageModule {}
