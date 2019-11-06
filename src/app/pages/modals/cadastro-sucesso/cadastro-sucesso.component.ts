import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-cadastro-sucesso',
  templateUrl: './cadastro-sucesso.component.html',
  styleUrls: ['./cadastro-sucesso.component.scss'],
})
export class CadastroSucessoComponent implements OnInit {

  constructor(
    private modalCtrl: ModalController
  ) {

  }

  ngOnInit() {

  }

  public closeModal(): void {
    this.modalCtrl.dismiss();
  }

}
