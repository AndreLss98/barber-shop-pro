import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';
import { IntroModalPage } from '../modals/intro-modal/intro-modal.page';
import { RecuperarSenhaPage } from '../modals/recuperar-senha/recuperar-senha.page';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private route: Router,
    private modalCtrl: ModalController
  ) {

  }

  ngOnInit() {

  }

  public login(): void {
    this.modalCtrl.create({ component: IntroModalPage }).then((modal) => modal.present());
  }

  public recuperarSenha() {
    this.modalCtrl.create({ component: RecuperarSenhaPage }).then((modal) => modal.present());
  }

  public goToCadastro(): void {
    this.route.navigateByUrl('cadastro-dados-pessoais');
  }

}
