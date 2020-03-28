import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-unauthorized',
  templateUrl: './user-unauthorized.component.html',
  styleUrls: ['./user-unauthorized.component.scss'],
})
export class UserUnauthorizedComponent implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  public closeModal() {
    this.modalCtrl.dismiss();
  }

}
