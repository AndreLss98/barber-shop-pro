import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { UserService } from 'src/app/services/user.service';
import { LoginService } from 'src/app/services/login/login.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

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
    public userService: UserService,
    private loginService: LoginService,
    private alertCtrl: AlertController,
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

}
