import { Component, OnInit } from '@angular/core';

import { itemDateAgenda, itemAgenda } from 'src/app/models/itemAgenda.model';

import { AgendaService } from 'src/app/services/agenda/agenda.service';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.page.html',
  styleUrls: ['./agenda.page.scss'],
})
export class AgendaPage implements OnInit {

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
    private agendaService: AgendaService
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

}
