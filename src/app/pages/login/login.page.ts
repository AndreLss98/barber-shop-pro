import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';

import { UserService } from 'src/app/services/user.service';
import { ChatService } from 'src/app/services/chat/chat.service';
import { LoginService } from 'src/app/services/login/login.service';

import { IntroModalPage } from '../modals/intro-modal/intro-modal.page';
import { RecuperarSenhaPage } from '../modals/recuperar-senha/recuperar-senha.page';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public email: string = '';
  public senha: string = '';

  public campoSenhaTipo: string = 'password';
  public iconeCampoSenha: string = 'assets/icon_hide_senha.svg';

  constructor(
    private route: Router,
    private userService: UserService,
    private chatService: ChatService,
    private modalCtrl: ModalController,
    private loginService: LoginService,
    private loadingCtrl: LoadingController,
  ) {

  }

  ngOnInit() {

  }

  public async login() {
    if (this.email && this.senha) {
      await this.showLoading();
      this.loginService.login(this.email, this.senha).subscribe(async (response: any) => {
        await this.cloaseLoading();
        if (response.errors) {
          console.error(response.errors);
        } else {
          this.email = this.senha = '';
          this.userService.user = response.data.loginProfissional;
          this.modalCtrl.create({ component: IntroModalPage }).then((modal) => modal.present().then(() => {
            this.chatService.afteLogin();
            this.userService.updateLocation().subscribe((response: any) => {
              console.log(response);
            }, (error) => console.log(error));
          }));
        }
      }, (error) => {
        console.error(error)
      }, () => {
        this.cloaseLoading();
      });
    }
  }

  public recuperarSenha() {
    this.modalCtrl.create({ component: RecuperarSenhaPage }).then((modal) => modal.present());
  }

  public goToCadastro(): void {
    this.route.navigateByUrl('selecao-dias');
  }

  public toogleFieldType() {
    this.campoSenhaTipo === 'password'? this.campoSenhaTipo = 'text' : this.campoSenhaTipo = 'password';
    this.iconeCampoSenha === 'assets/icon_hide_senha.svg'? this.iconeCampoSenha = 'assets/icon_show_senha.svg' : this.iconeCampoSenha = 'assets/icon_hide_senha.svg';
  }

  private async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'logando...',
      mode: 'md'
    });
    await loading.present();
  }

  private async cloaseLoading() {
    await this.loadingCtrl.dismiss();
  }

}
