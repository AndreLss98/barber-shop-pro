import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

import { NOME_DIAS_SEMANA } from './../../constants/constants';

import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-selecao-dias',
  templateUrl: './selecao-dias.page.html',
  styleUrls: ['./selecao-dias.page.scss'],
})
export class SelecaoDiasPage implements OnInit {

  readonly NOME_DIAS_SEMANA = NOME_DIAS_SEMANA;
  private contadorDiasTrabalho: number = 0;

  constructor(
    private route: Router,
    private userService: UserService,
    private alertCtrl: AlertController
  ) { 

  }

  ngOnInit() {

  }

  public goToDadosPessoais() {
    if (this.contadorDiasTrabalho !== 0) {
      this.route.navigateByUrl('cadastro-dados-pessoais');
    } else {
      this.showAlert('Escolha ao menos um dia de trabalho.');
    }
  }

  public selectDay(obj: HTMLElement, pos: number) {
    if (obj.classList.length === 1) {
      this.contadorDiasTrabalho++;
      obj.classList.add('selected');
      this.userService.newUser[`${NOME_DIAS_SEMANA[pos].toLowerCase()}`] = true;
    } else {
      this.contadorDiasTrabalho--;
      obj.classList.remove('selected');
      this.userService.newUser[`${NOME_DIAS_SEMANA[pos].toLowerCase()}`] = false;
    }
  }

  public showAlert(message: string) {
    this.alertCtrl.create({
      message,
      mode: 'ios',
      backdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          role: 'Cancel'
        }
      ]
    }).then((alert) => {
      alert.present();
    })
  }

}
