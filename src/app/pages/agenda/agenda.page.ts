import { Component, OnInit } from '@angular/core';
import { PopoverController, ModalController } from '@ionic/angular';

import { NOME_DIAS_SEMANA } from './../../constants/constants';

import { itemDateAgenda, itemAgenda } from 'src/app/models/itemAgenda.model';

import { UserService } from 'src/app/services/user.service';
import { AgendaService } from 'src/app/services/agenda/agenda.service';

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

  readonly NOME_DIAS_SEMANA = NOME_DIAS_SEMANA;

  public slidesConfig = {
    slidesPerView: 7
  }

  public agenda: itemDateAgenda[] = [];
  public agendaFiltrada: itemAgenda[] = [];

  public currentYear;
  public nameCurrentMoth: string;
  public month = [];

  public selectedDay: number = null;

  constructor(
    public userService: UserService,
    private modalCtrl: ModalController,
    public agendaService: AgendaService,
    private popoverCtrl: PopoverController,
  ) {

  }

  ngOnInit() {
    this.currentYear = this.agendaService.getYear();
    this.nameCurrentMoth = this.agendaService.getMonthName(this.agendaService.getMonth());
    this.month = this.agendaService.constructMonth(this.agendaService.getDate());
    this.agenda = this.agendaService.getAgenda(this.nameCurrentMoth, this.currentYear);
    this.checkAgenda();
  }

  private setMonth(month: number) {
    let newDate = new Date(this.currentYear, month, 1);
    if (month > this.agendaService.getMonth()) {
      this.nameCurrentMoth = this.agendaService.getMonthName(month);
      this.month = this.agendaService.constructMonth(newDate);
    } else if (month === this.agendaService.getMonth()) {
      this.nameCurrentMoth = this.agendaService.getMonthName(month);
      this.month = this.agendaService.constructMonth(this.agendaService.getDate());
    }
  }

  public async presentPopOver(event: Event) {
    let popover = await this.popoverCtrl.create({
      component: MesAgendaComponent,
      event,
      mode: 'ios'
    });

    popover.present();

    popover.onDidDismiss().then(popoverdata => {
      this.setMonth(popoverdata.data);
    });
  }

  public checkAgenda() {
    this.month.forEach(element => {
      this.agenda.forEach(agenda => {
        if (agenda.day === element.day) {
          element.hasService = true;
          return;
        }
      })
    });
  }

  public selectDay(day, pos) {
    this.selectedDay = pos;
    const tempSelectedDay = this.month[pos];
    this.agenda.forEach(element => {
      if (element.month === this.nameCurrentMoth.toLowerCase() && element.day === tempSelectedDay.day) {
        this.agendaFiltrada = element.items;
        return;
      } else {
        this.agendaFiltrada = [];
      }
    })
  }

  public openMenu() {
    this.modalCtrl.create({ 
      component: CustomMenuComponent,
      enterAnimation: topDownAnimation,
      leaveAnimation: downTopAnimation
    }).then((modal) => modal.present());
  }

}
