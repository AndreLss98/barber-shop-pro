import { AlertController } from '@ionic/angular';
import { Component, OnInit, Input } from '@angular/core';

import { cliente } from 'src/app/models/cliente.model';
import { endereco } from 'src/app/models/profissional.model';
import { servico } from 'src/app/models/servico.model';

@Component({
  selector: 'historico-item',
  templateUrl: './historico-item.component.html',
  styleUrls: ['./historico-item.component.scss'],
})
export class HistoricoItemComponent implements OnInit {

  @Input() servico: servico;
  
  public qtdStar: number = 0;
  public valorFormatado: string;
  public horarioFormatado: string;

  public stars: Array<{ src: string }> = [
    {
      src: 'assets/star.svg'
    },
    {
      src: 'assets/star.svg'
    },
    {
      src: 'assets/star.svg'
    },
    {
      src: 'assets/star.svg'
    },
    {
      src: 'assets/star.svg'
    }
  ]

  constructor(private alertCtrl: AlertController) {

  }

  ngOnInit() {
    this.valorFormatado = Number(this.servico.valortotal).toFixed(2).replace('.', ',');
    this.horarioFormatado = this.servico.horario.substr(0, 5);
  }

  public toggleStars(pos: number) {
    for (let i = 0; i < pos; i++) {
      this.stars[i].src = 'assets/starColored.svg';
    }

    for (let i = pos; i < this.stars.length; i++) {
      this.stars[i].src = 'assets/star.svg';
    }
  }

  public showAlert(): void {
    this.alertCtrl.create({
      message: 'Obrigado pela sua avaliação',
      mode: 'ios',
      backdropDismiss: false,
      buttons: [
        {
          text: 'Feito',
          handler: () => {

          }
        }
      ]
    }).then((alert) => alert.present());
  }

}
