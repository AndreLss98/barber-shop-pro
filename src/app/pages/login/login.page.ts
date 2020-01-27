import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';

import { Socket } from 'ngx-socket-io';

import { UserService } from 'src/app/services/user.service';
import { GpsService } from 'src/app/services/gps/gps.service';
import { ChatService } from 'src/app/services/chat/chat.service';
import { LoginService } from 'src/app/services/login/login.service';
import { AgendaService } from 'src/app/services/agenda/agenda.service';

import { IntroModalPage } from '../modals/intro-modal/intro-modal.page';
import { RecuperarSenhaPage } from '../modals/recuperar-senha/recuperar-senha.page';

import { NotificacaoAgendaComponent } from 'src/app/pages/modals/notificacao-agenda/notificacao-agenda.component';

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

  private notifyListen: Subscription;

  constructor(
    private route: Router,
    private socket: Socket,
    private gpsService: GpsService,
    private userService: UserService,
    private chatService: ChatService,
    private modalCtrl: ModalController,
    private loginService: LoginService,
    private agendaService: AgendaService,
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
            this.gpsService.updateLocation();
            this.startListenAgenda();
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

  public startListenAgenda() {
    this.notifyListen = this.socket.fromEvent('new-request').subscribe((request: any) => {
      console.log(request);
      this.modalCtrl.create({component: NotificacaoAgendaComponent, componentProps: {
        nome: request.nome,
        dia: request.dia,
        mes: request.mes,
        horario: request.horario,
        endereco: request.endereco.endereco,
        imgPerfil: request.imgperfil,
        idservico: request.idservico
      }}).then((modal) => modal.present());
    });
  }

}
