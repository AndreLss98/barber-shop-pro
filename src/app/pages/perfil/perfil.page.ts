import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AlertController, ActionSheetController, LoadingController } from '@ionic/angular';

import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';

import { BASE_URL } from './../../../environments/environment';

import { UserService } from 'src/app/services/user.service';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  readonly BASE_URL = BASE_URL;

  private downArrow: string = 'ios-arrow-down';
  private forwardArrow: string = 'ios-arrow-forward';

  public isExpandedName: boolean = false;
  public isExpandedPassword: boolean = false;
  public arrowName: string = 'ios-arrow-forward';
  public arrowPassword: string = 'ios-arrow-forward';

  public newPassword: string = '';
  public confirmNewPassword: string = '';
  public validPassword: boolean = false;

  constructor(
    private route: Router,
    private camera: Camera,
    public userService: UserService,
    private loginService: LoginService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private actionSheetCtrl: ActionSheetController,
  ) {

  }

  ngOnInit() {

  }

  public logout() {
    this.route.navigateByUrl('login');
  }

  public extendColName() {
    this.isExpandedName = !this.isExpandedName;
    this.isExpandedName? this.arrowName = this.downArrow : this.arrowName = this.forwardArrow;
  }

  public extendColPassword() {
    this.isExpandedPassword = !this.isExpandedPassword;
    this.isExpandedPassword? this.arrowPassword = this.downArrow : this.arrowPassword = this.forwardArrow;
  }

  public checkPassword(): boolean {
    if (/.{6,}/.test(this.newPassword)) {
      this.validPassword = true;
    } else {
      this.validPassword = false;
    }
    return this.validPassword;
  }

  public updatePassword() {
    if ((this.newPassword && this.confirmNewPassword) && (this.newPassword === this.confirmNewPassword)) {
      this.loginService.changePassword(this.newPassword).subscribe((response: any) => {
        if (response.errors) {
          console.log(response.errors);
          this.showAlert('Algo deu errado!');
        } else {
          this.newPassword = this.confirmNewPassword = '';
          this.isExpandedPassword = false;
          this.showAlert('Senha atualizada com sucesso!');
        }
      });
    } else if ((this.newPassword && this.confirmNewPassword) && (this.newPassword !== this.confirmNewPassword)) {
      this.showAlert('As senhas não coincidem!');
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
    }).then((alert) => alert.present());
  }

  public selectPerfilImg() {
    this.actionSheetCtrl.create({
      header: 'Selecione a fonte da imagem',
      mode: 'ios',
      buttons: [
        {
          text: 'Carregar da galeria',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Usar a camêra',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel'
        }
      ]
    }).then((action) => action.present());
  }

  private takePicture(sourceType: PictureSourceType) {
    const CAMERA_OPTIONS: CameraOptions = {
      sourceType,
      quality: 100,
      saveToPhotoAlbum: false,
      correctOrientation: true,
      destinationType: this.camera.DestinationType.FILE_URI,
    }

    this.camera.getPicture(CAMERA_OPTIONS).then(async (imagePath) => {
      await this.showLoading();
      this.userService.uploadImg(imagePath, 'imgPerfil', this.userService.user.idprofissional).subscribe((res) => {
        const tempResponse = JSON.parse(res.response);
        this.userService.user.imgperfil = tempResponse.filename;
        this.cloaseLoading();
      }, (error) => {
        this.cloaseLoading();
        console.error(error);
      });
    });
  }

  private async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Enviando...',
      mode: 'md',
    });
    await loading.present();
  }

  private async cloaseLoading() {
    await this.loadingCtrl.dismiss();
  }
}
