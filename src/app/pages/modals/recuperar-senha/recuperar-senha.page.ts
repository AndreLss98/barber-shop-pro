import { timeout } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';

import { BASE_URL_GRAPHQL } from 'src/environments/environment';
import { HTTP_OPTIONS, TIMEOUT_SIZE } from 'src/app/constants/http-constants';

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
    private modalCtrl: ModalController,
    private http: HttpClient
  ) {
    this.formGroup = this.formBuilder.group({
      email: [null, [Validators.email, Validators.required]]
    });
  }

  ngOnInit() {

  }

  public sendEmail() {
    const body =
    `{
      getSenhaProfissional(email: "${this.formGroup.value.email}")
    }`;
    this.http.post(BASE_URL_GRAPHQL, body, HTTP_OPTIONS).pipe(timeout(TIMEOUT_SIZE)).subscribe((response: any) => {
      if (response.errors) {
        console.error(response.errors);
      } else {
        this.openAlert();
      }
    }, (error) => console.error(error));
  }

  public async openAlert() {
    this.alertCtrl.create({
      header: "Atenção",
      message: `E-mail enviado para ${this.formGroup.value.email}`,
      backdropDismiss: false,
      mode: 'ios',
      buttons: [
        {
          text: "Ok",
          handler: () => {
            this.formGroup.patchValue({
              email: ''
            });
            this.modalCtrl.dismiss();
          }
        }
      ]
    }).then((alert) => alert.present());
  }

  public clearEmailInput() {
    this.formGroup.patchValue({
      email: ''
    })
  }

}
