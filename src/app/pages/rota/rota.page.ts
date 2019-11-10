import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { MapService } from 'src/app/services/map/map.service';
import { CustomMenuComponent } from '../modals/custom-menu/custom-menu.component';
import { topDownAnimation } from 'src/app/animations/top-down-animation';
import { downTopAnimation } from 'src/app/animations/down-top-animation';

@Component({
  selector: 'app-rota',
  templateUrl: './rota.page.html',
  styleUrls: ['./rota.page.scss'],
})
export class RotaPage implements OnInit {


  private content: HTMLElement;

  constructor(
    private mapService: MapService,
    private modalCtrl: ModalController
  ) {

  }

  ngOnInit() {
    this.content = document.getElementById('content');
    this.content.appendChild(this.mapService.mapElement);
    this.mapService.configMap();
    this.mapService.initializeMapMarkers();
    this.mapService.initializeRoute();
  }

  ionViewDidEnter() {
    setTimeout(() => {
      this.mapService.map.resize();
    }, 500);
  }

  public openMenu() {
    this.modalCtrl.create({
      component: CustomMenuComponent,
      enterAnimation: topDownAnimation,
      leaveAnimation: downTopAnimation
    }).then((modal) => modal.present());
  }

}
