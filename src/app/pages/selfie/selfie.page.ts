import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController, AlertController } from '@ionic/angular';

import { CameraOptions, Camera } from '@ionic-native/camera/ngx';

import { CadastroSucessoComponent } from '../modals/cadastro-sucesso/cadastro-sucesso.component';
import { ConnectionStatusComponent } from '../modals/connection-status/connection-status.component';

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-selfie',
  templateUrl: './selfie.page.html',
  styleUrls: ['./selfie.page.scss'],
})
export class SelfiePage implements OnInit {

  public isSelfie: boolean = false;

  constructor(
    private route: Router,
    private camera: Camera,
    private userService: UserService,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
  ) {

  }

  ngOnInit() {

  }

  public async takeSelfie() {
    const CAMERA_OPTIONS: CameraOptions = {
      quality: 100,
      correctOrientation: true,
      destinationType: this.camera.DestinationType.FILE_URI,
      cameraDirection: 1
    }
    this.camera.getPicture(CAMERA_OPTIONS).then((photo) => {
      this.userService.newUser.selfie = photo;
      this.sendRegister();
    });
  }

  public sendRegister() {
    this.showLoading();
    this.userService.sendRegister().subscribe((response: any) => {
      if (response.errors) {
        this.closeLoading();
        this.connectionError();
        console.error(response.errors);
      } else {
        const idprofissional = response.data.registerProfissional.idprofissional;
        this.sendAllPictures(idprofissional, this.userService.newUser);
      }
    }, (error) => {
      this.closeLoading();
      this.connectionError();
      console.log('Sub error: ', error);
    });
  }

  public async showLoading() {
    await this.loadingCtrl.create({
      message: 'Enviando dados...',
      mode: 'md'
    }).then((loader) => {
      loader.present();
    })
  }

  public closeLoading() {
    setTimeout(() => {
      this.loadingCtrl.dismiss();
    }, 500);
  }

  private connectionError(): void {
    setTimeout(() => {
      this.modalCtrl.create({ component: ConnectionStatusComponent }).then((modal) => modal.present());
    }, 650);
  }

  private sendAllPictures(idprofissional, user) {
    const { imgDocFront, imgDocBack, selfie } = user;
    this.userService.uploadImg(imgDocFront, 'imgDocFront', idprofissional).subscribe((response: any) => {
      this.userService.uploadImg(imgDocBack, 'imgDocBack', idprofissional).subscribe((response: any) => {
        this.userService.uploadImg(selfie, 'imgSelfie', idprofissional).subscribe((response: any) => {
          this.closeLoading();
          this.modalCtrl.create({ component: CadastroSucessoComponent }).then((modal) => {
            modal.present();
            modal.onWillDismiss().then(() => this.route.navigateByUrl('login'));
          });
        }, (error) => {
          this.closeLoading();
          console.error('Error ao enviar selfie: ', error);
          this.showAlert(idprofissional, user);
        })
      }, (error) => {
        this.closeLoading();
        console.error('Error ao enviar img da parte de trás do documento: ', error);
        this.showAlert(idprofissional, user);
      });
    }, (error) => {
      this.closeLoading();
      console.error('Error ao enviar img da frente do documento: ', error);
      this.showAlert(idprofissional, user);
    });
  }

  private showAlert(idprofissional, user) {
    this.alertCtrl.create({
      message: 'Erro ao enviar imagens para o servidor',
      mode: 'ios',
      buttons: [
        {
          text: 'Cancelar',
          role: 'Cancel'
        },
        {
          text: 'Tentar Novamente',
          handler: () => {
            this.showLoading();
            this.sendAllPictures(idprofissional, user);
          }
        }
      ]
    }).then((alert) => alert.present());
  }

}
