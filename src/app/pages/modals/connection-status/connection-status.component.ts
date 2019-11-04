import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-connection-status',
  templateUrl: './connection-status.component.html',
  styleUrls: ['./connection-status.component.scss'],
})
export class ConnectionStatusComponent implements OnInit {

  constructor(private modalCtrl: ModalController) {

  }

  ngOnInit() {

  }

  public closeModal() {
    this.modalCtrl.dismiss();
  }

}
