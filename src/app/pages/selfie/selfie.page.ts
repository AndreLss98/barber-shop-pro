import { Router } from '@angular/router';
import { ModalController, LoadingController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

import { CameraOptions, Camera } from '@ionic-native/camera/ngx';

import { CadastroSucessoComponent } from '../modals/cadastro-sucesso/cadastro-sucesso.component';

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
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController
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
        console.error(response.errors);
      } else {
        const idprofissional = response.data.registerProfissional.idprofissional;
        const { imgDocFront, imgDocBack, selfie } = this.userService.newUser;
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
            })
          }, (error) => {
            this.closeLoading();
            console.error('Error ao enviar img da parte de trás do documento: ', error);
          });
        }, (error) => {
          this.closeLoading();
          console.error('Error ao enviar img da frente do documento: ', error);
        });
      }
    }, (error) => {
      this.closeLoading();
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

  public async closeLoading() {
    await this.loadingCtrl.dismiss();
  }

}
