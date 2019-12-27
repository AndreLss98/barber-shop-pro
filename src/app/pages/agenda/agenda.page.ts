import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PopoverController, ModalController } from '@ionic/angular';

import { NOME_DIAS_SEMANA, NOME_MESES } from './../../constants/constants';

import { servico } from 'src/app/models/servico.model';

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
    spaceBetween: 20
  }

  public agenda: servico[] = [];
  public agendaFiltrada: any[] = [];

  private dataAtual: Date = new Date();
  public anoSelecionado: number;
  private numeroMesSelecionado: number;
  public nomeMesSelecionado: string;
  public diasRestanteMesSelecionado: any[] = [];

  public diaSelecionado: number = null;

  constructor(
    private route: ActivatedRoute,
    public userService: UserService,
    private modalCtrl: ModalController,
    public agendaService: AgendaService,
    private popoverCtrl: PopoverController,
    private calendarioService: CalendarioService
  ) {

  }

  ngOnInit() {
    this.configuraDataAtual();
    if (this.route.snapshot.data.agenda) {
      this.agenda = this.route.snapshot.data.agenda.data.agendaProfissional;
    }
    this.checkAgenda();
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
        if (popoverdata.data) {
          if (popoverdata.data === this.numeroMesSelecionado) {
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
      }
    });
  }

  public openMenu() {
    this.modalCtrl.create({ 
      component: CustomMenuComponent,
      enterAnimation: topDownAnimation,
      leaveAnimation: downTopAnimation
    }).then((modal) => modal.present());
  }

}
