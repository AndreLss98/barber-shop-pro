import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { CameraOptions, Camera } from '@ionic-native/camera/ngx';
import { CadastroSucessoComponent } from '../modals/cadastro-sucesso/cadastro-sucesso.component';
import { Router } from '@angular/router';

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
    private modalCtrl: ModalController
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
    const modal = await this.modalCtrl.create({ component: CadastroSucessoComponent });
    this.camera.getPicture(CAMERA_OPTIONS).then((photo) => {
      modal.present();
    });

    modal.onWillDismiss().then((response) => this.route.navigateByUrl('login'));
  }

}
