import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

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

  constructor(
    private route: Router,
    private userService: UserService,
    private chatService: ChatService,
    private modalCtrl: ModalController,
    private loginService: LoginService,
  ) {

  }

  ngOnInit() {

  }

  public login(): void {
    if (this.email && this.senha) {
      this.loginService.login(this.email, this.senha).subscribe((response: any) => {
        if (response.error) {
          console.error(response.error);
        } else {
          this.userService.user = response.data.loginProfissional;
          this.modalCtrl.create({ component: IntroModalPage }).then((modal) => modal.present().then(() => {
            this.chatService.afteLogin();
          }));
        }
      });      
    }
  }

  public recuperarSenha() {
    this.modalCtrl.create({ component: RecuperarSenhaPage }).then((modal) => modal.present());
  }

  public goToCadastro(): void {
    this.route.navigateByUrl('cadastro-dados-pessoais');
  }

}
