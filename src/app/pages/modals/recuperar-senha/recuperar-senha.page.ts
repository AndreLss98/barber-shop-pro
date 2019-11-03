import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-recuperar-senha',
  templateUrl: './recuperar-senha.page.html',
  styleUrls: ['./recuperar-senha.page.scss'],
})
export class RecuperarSenhaPage implements OnInit {

  public formGroup: any;

  constructor(
    private formBuilder: FormBuilder,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController
  ) {
    this.formGroup = this.formBuilder.group({
      email: [null, [Validators.email, Validators.required]]
    });
  }

  ngOnInit() {

  }

  public async openAlert() {
    this.alertCtrl.create({
      header: "Atenção",
      message: "E-mail enviado com sucesso para recuperar a senha.",
      backdropDismiss: false,
      mode: 'ios',
      buttons: [
        {
          text: "Ok",
          handler: () => {
            this.modalCtrl.dismiss();
          }
        }
      ]
    }).then((alert) => alert.present());
  }

}
