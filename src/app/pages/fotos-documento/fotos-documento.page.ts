import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-fotos-documento',
  templateUrl: './fotos-documento.page.html',
  styleUrls: ['./fotos-documento.page.scss'],
})
export class FotosDocumentoPage implements OnInit {

  public isPhotoFront: boolean = false;
  public isPhotoBack: boolean = false;

  constructor(
    private route: Router,
    private camera: Camera,
    private platform: Platform,
    private userService: UserService,
  ) {

  }

  ngOnInit() {

  }

  public takePhotoFront(): void {
    if (this.platform.is('android') || this.platform.is('android')) {
      const CAMERA_OPTIONS: CameraOptions = {
        quality: 100,
        correctOrientation: true,
        destinationType: this.camera.DestinationType.FILE_URI
      };
      this.camera.getPicture(CAMERA_OPTIONS).then((photo) => {
        this.userService.newUser.imgDocFront = photo;
        this.isPhotoFront = true;
      });
    }
  }

  public takePhotoBack(): void {
    if (this.platform.is('android') || this.platform.is('android')) {
      const CAMERA_OPTIONS: CameraOptions = {
        quality: 100,
        correctOrientation: true,
        destinationType: this.camera.DestinationType.FILE_URI
      };
      this.camera.getPicture(CAMERA_OPTIONS).then((photo) => {
        this.userService.newUser.imgDocBack = photo;
        this.isPhotoBack = true;
      });
    }
  }

  public goToSelfie(): void {
    this.route.navigateByUrl('selfie');
  }

}
