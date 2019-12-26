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
    // this.checkAgenda();
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

  /* private setMonth(month: number) {
    let newDate = new Date(this.anoSelecionado, month, 1);
    if (month > this.agendaService.getMonth()) {
      this.nomeMesSelecionado = this.agendaService.getMonthName(month);
      this.diasRestanteMesSelecionado = this.agendaService.constructMonth(newDate);
    } else if (month === this.agendaService.getMonth()) {
      this.nomeMesSelecionado = this.agendaService.getMonthName(month);
      this.diasRestanteMesSelecionado = this.agendaService.constructMonth(this.agendaService.getDate());
    }
  } */

  public async presentPopOver(event: Event) {
    let popover = await this.popoverCtrl.create({
      component: MesAgendaComponent,
      event,
      mode: 'ios'
    });

    popover.present();

    popover.onDidDismiss().then(popoverdata => {
      // this.setMonth(popoverdata.data);
    });
  }

  /* public checkAgenda() {
    this.diasRestanteMesSelecionado.forEach(element => {
      this.agenda.forEach(agenda => {
        if (agenda.day === element.day) {
          element.hasService = true;
          return;
        }
      })
    });
  } */

  /* public selectDay(day, pos) {
    this.diaSelecionado = pos;
    const tempSelectedDay = this.diasRestanteMesSelecionado[pos];
    this.agenda.forEach(element => {
      if (element.month === this.nomeMesSelecionado.toLowerCase() && element.day === tempSelectedDay.day) {
        this.agendaFiltrada = element.items;
        return;
      } else {
        this.agendaFiltrada = [];
      }
    })
  } */

  public openMenu() {
    this.modalCtrl.create({ 
      component: CustomMenuComponent,
      enterAnimation: topDownAnimation,
      leaveAnimation: downTopAnimation
    }).then((modal) => modal.present());
  }

}
