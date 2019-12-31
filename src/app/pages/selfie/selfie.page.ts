import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
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

  public isSelfie: boolean = false; // valor padrao false

  constructor(
    private route: Router,
    private camera: Camera,
    private userService: UserService,
    private modalCtrl: ModalController,
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
    this.sendRegister();
    // A requisicao para cadastro sera feita apenas após a captura da selfie com o documento
    /* this.camera.getPicture(CAMERA_OPTIONS).then((photo) => {
      this.sendRegister();
    }); */
  }

  public sendRegister() {
    this.userService.sendRegister().subscribe((response: any) => {
      if (response.errors) {
        console.log(response.errors);
      } else {
        this.modalCtrl.create({ component: CadastroSucessoComponent }).then((modal) => {
          modal.present();
          modal.onWillDismiss().then(() => this.route.navigateByUrl('login'));
        })
      }
    });
  }

}
