import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { Network } from '@ionic-native/network/ngx';

import { ConnectionStatusComponent } from 'src/app/pages/modals/connection-status/connection-status.component';

import { topDownAnimation } from 'src/app/animations/top-down-animation';
import { downTopAnimation } from 'src/app/animations/down-top-animation';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  private conectionModal: HTMLIonModalElement;

  constructor(
    private network: Network,
    private modalCtrl: ModalController
  ) { 

  }

  public initializeNetworkEvents() {
    this.network.onDisconnect().subscribe(() => {
      this.openModal();
    });

    this.network.onConnect().subscribe(() => {
      this.closeModal();
    });
  }

  private async openModal() {
    this.conectionModal = await this.modalCtrl.create({
      component: ConnectionStatusComponent,
      enterAnimation: topDownAnimation,
      leaveAnimation: downTopAnimation
    });
    this.conectionModal.present();
  }

  public closeModal(): void {
    if (this.conectionModal) {
      this.conectionModal.dismiss();
    }
  }

}
