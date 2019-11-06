import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnInit {

  constructor(private modalCtrl: ModalController) {

  }

  ngOnInit() {

  }

  public closeModal() {
    this.modalCtrl.dismiss();
  }

}
