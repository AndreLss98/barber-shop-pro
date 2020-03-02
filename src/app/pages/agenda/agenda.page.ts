import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PopoverController, ModalController, AlertController, Events } from '@ionic/angular';

import { NOME_DIAS_SEMANA, NOME_MESES } from './../../constants/constants';

import { servico } from 'src/app/models/servico.model';
import { diasTrabalho } from 'src/app/models/profissional.model';

import { UserService } from 'src/app/services/user.service';
import { AgendaService } from 'src/app/services/agenda/agenda.service';
import { CalendarioService } from 'src/app/services/calendario/calendario.service';

import { CustomMenuComponent } from '../modals/custom-menu/custom-menu.component';
import { MesAgendaComponent } from 'src/app/components/popovers/mes-agenda/mes-agenda.component';

import { topDownAnimation } from 'src/app/animations/top-down-animation';
import { downTopAnimation } from 'src/app/animations/down-top-animation';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.page.html',
  styleUrls: ['./agenda.page.scss'],
})
export class AgendaPage implements OnInit {

  readonly NOME_MESES = NOME_MESES;
  readonly NOME_DIAS_SEMANA = NOME_DIAS_SEMANA;

  public slidesConfig = {
    slidesPerView: 7,
    spaceBetween: 18
  }

  private timeoutInstance;

  public agenda: servico[] = [];
  public agendaFiltrada: any[] = [];

  private dataAtual: Date = new Date();
  public anoSelecionado: number;
  private numeroMesSelecionado: number;
  public nomeMesSelecionado: string;
  public diasRestanteMesSelecionado: any[] = [];

  public diaSelecionado: number = null;

  public tempDiasTrabalho: diasTrabalho = {
    dom: false,
    seg: false,
    ter: false,
    qua: false,
    qui: false,
    sex: false,
    sab: false
  };

  constructor(
    private events: Events,
    private router: Router,
    private route: ActivatedRoute,
    public userService: UserService,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    public agendaService: AgendaService,
    private popoverCtrl: PopoverController,
    private calendarioService: CalendarioService,
  ) {
    events.subscribe('reload-agenda', () => {
      this.reloadAgenda();
    })
  }

  ngOnInit() {
    this.configuraDataAtual();
    this.syncWorkDays();
    if (this.route.snapshot.data.agenda) {
      const tempAgenda: servico[] = this.route.snapshot.data.agenda.data.agendaProfissional;
      this.agenda = tempAgenda.filter(servico => servico.aceito);
      console.log('Agenda: ', this.agenda);
      console.log('Temp: ', tempAgenda);
    }
    this.checkAgenda();
  }

  private reloadAgenda() {
    this.agendaService.getAgenda().subscribe((response: any) => {
      if (response.errors) {
        console.error(response.errors);
      } else {
        this.agenda = response.data.agendaProfissional;
        this.checkAgenda();
      }
    }, (error) => console.error(error));
  }

  ionViewDidEnter() {
    setTimeout(() => {
      this.checkValues();
    }, 1500)
  }

  private configuraDataAtual() {
    this.anoSelecionado = this.dataAtual.getFullYear();
    this.numeroMesSelecionado = this.dataAtual.getMonth();
    this.nomeMesSelecionado = NOME_MESES[this.numeroMesSelecionado];
    this.diasRestanteMesSelecionado = this.calendarioService.diasRestanteDoMesAtual(this.dataAtual);
    this.selectDay({ numero: this.dataAtual.getDate() });
  }

  public selectDay(dia) {
    this.diaSelecionado = dia.numero;
    this.agendaFiltrada = this.agenda.filter(servico => servico.dia === this.diaSelecionado);
  }

  private setMonth(numeroMes: number) {
    const newDate = new Date(this.anoSelecionado, numeroMes, 1);
    this.nomeMesSelecionado = NOME_MESES[numeroMes];
    this.diasRestanteMesSelecionado = this.calendarioService.diasRestanteDoMesAtual(newDate);
    this.selectDay({ numero: 1 });
  }

  public async presentPopOver(event: Event) {
    await this.popoverCtrl.create({
      component: MesAgendaComponent,
      event,
      mode: 'ios'
    }).then((popover) => {
      popover.present();
      popover.onDidDismiss().then((popoverdata) => {
        if (popoverdata.data !== undefined) {
          if (popoverdata.data === this.dataAtual.getMonth()) {
            this.configuraDataAtual();
          } else {
            this.setMonth(popoverdata.data);
          }
          this.checkAgenda();
        }
      });
    });
  }

  public checkAgenda() {
    this.diasRestanteMesSelecionado.forEach(dia => {
      if (this.agenda.find(servico => servico.dia === dia.numero && servico.mes === this.nomeMesSelecionado.toLowerCase())) {
        dia.hasService = true;
      } else {
        dia.hasService = false;
      }
    });
  }

  public checkValues() {
    if (this.userService.user.valores.length === 0) {
      this.showAlertOfValues('Cadastrar valores de serviços agora?');
    }
  }

  public openMenu() {
    this.modalCtrl.create({ 
      component: CustomMenuComponent,
      enterAnimation: topDownAnimation,
      leaveAnimation: downTopAnimation
    }).then((modal) => modal.present());
  }

  public showAlertOfValues(message: string) {
    this.alertCtrl.create({
      message,
      mode: 'ios',
      backdropDismiss: false,
      buttons: [
        {
          text: 'Não',
          role: 'Cancel'
        },
        {
          text: 'Sim',
          handler: () => {
            this.router.navigateByUrl('prices');
          }
        }
      ]
    }).then((alert) => {
      alert.present();
    })
  }

  public emitEvent() {
    clearTimeout(this.timeoutInstance);
    this.timeoutInstance = setTimeout(() => {
      this.showAlertUpdateDays();
    }, 1000);
  }

  private showAlertUpdateDays() {
    this.alertCtrl.create({
      header: 'Atenção',
      message: 'Deseja alterar os dias de trabalho?',
      mode: 'ios',
      backdropDismiss: false,
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          handler: () => {
            this.syncWorkDays();
          }
        },
        {
          text: 'Sim',
          role: 'destructive',
          handler: () => {
            this.updateDays();
          }
        }
      ]
    }).then((alert) => alert.present());
  }

  private updateDays() {
    this.agendaService.updateDiasTrabalho(this.tempDiasTrabalho).subscribe((response: any) => {
      if (response.errors) {
        console.error(response.errors);
      } else {
        this.userService.user.diasTrabalho = {...this.tempDiasTrabalho};
      }
    }, (error) => console.log(error));
  }

  private syncWorkDays() {
    this.tempDiasTrabalho = {...this.userService.user.diasTrabalho};
  }

  public onCancelService(idservico: number) {
    /* this.agendaService.cancelService(idservico).subscribe((response: any) => {
      if (response.errors) {
        console.error(response.errors);
      } else {
        this.agenda = this.agenda.filter(item => item.idservico !== idservico);
        this.agendaFiltrada = this.agendaFiltrada.filter(item => item.idservico !== idservico);
        this.checkAgenda();
      }
    }) */
  }

  private cancelOldServices(servicos: servico[]) {
    if (!servicos || servicos.length === 0) {
      return;
    } else {
      const oldservice = servicos[servicos.length - 1];
      this.agendaService.cancelService(oldservice.paymentid, oldservice.idservico, oldservice.idprofissional).subscribe((response: any) => {
        servicos.pop();
        this.cancelOldServices(servicos);
      }, (error) => {
        console.log(error);
      });
    }
  }

}
