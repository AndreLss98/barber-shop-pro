import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

import { downTopAnimation } from 'src/app/animations/down-top-animation';
import { topDownAnimation } from 'src/app/animations/top-down-animation';

import { endereco } from 'src/app/models/profissional.model';

import { MapService } from 'src/app/services/map/map.service';

import { CustomMenuComponent } from '../modals/custom-menu/custom-menu.component';
import { NotificacaoAgendaComponent } from '../modals/notificacao-agenda/notificacao-agenda.component';

@Component({
  selector: 'app-rota',
  templateUrl: './rota.page.html',
  styleUrls: ['./rota.page.scss'],
})
export class RotaPage implements OnInit {


  private content: HTMLElement;
  private currentAddres: endereco;

  constructor(
    private route: ActivatedRoute,
    private mapService: MapService,
    private modalCtrl: ModalController
  ) {

  }

  ngOnInit() {
    this.content = document.getElementById('content');
    this.content.appendChild(this.mapService.mapElement);
    this.mapService.configMap();
    if (this.route.snapshot.data['endereco']) {
      this.currentAddres = this.route.snapshot.data['endereco'];
      this.mapService.getServiceLocation(this.currentAddres).subscribe((location: any) => {
        this.mapService.initializeMapMarkers(location.features[0].center);
        this.mapService.initializeRoute(location.features[0].center);
      })
    }
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

  public testModal() {
    this.modalCtrl.create({ component: NotificacaoAgendaComponent }).then((modal) => modal.present());
  }

}
