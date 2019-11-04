import { Component, OnInit, Input } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'historico-item',
  templateUrl: './historico-item.component.html',
  styleUrls: ['./historico-item.component.scss'],
})
export class HistoricoItemComponent implements OnInit {

  @Input() valor: any;
  @Input() nome: string;
  @Input() local: string;
  @Input() horario: string;

  public qtdStar: number = 0;

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
    if (this.valor) {
      this.valor = Number(this.valor).toFixed(2).replace('.', ',');
    }
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
