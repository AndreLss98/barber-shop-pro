import { Injectable } from '@angular/core';

import { itemDateAgenda } from 'src/app/models/itemAgenda.model';

const nameMonths = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
const nameWeekDays: string[] = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'];

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  private data: itemDateAgenda[] = [
    {
      day: 20,
      month: 'dezembro',
      year: 2019,
      items: [
        {
          local: "Rua Recife - QD 05 LT 13 - CEP: 745656-089",
          horario: "08:00",
          servico: "Corte de cabelo",
          valor: 30,
          nome: "Dione Moreira"
        },
        {
          local: "Rua Recife - QD 05 LT 13 - CEP: 745656-089",
          horario: "08:00",
          servico: "Corte de cabelo",
          valor: 30,
          nome: "Dione Moreira"
        }
      ]
    }
  ]

  private currentDate = new Date();
  private currentDay = this.currentDate.getDate();
  private currentMonth = this.currentDate.getMonth();
  private currentYear = this.currentDate.getFullYear();

  constructor() {

  }

  public getWeekDays(): string[] {
    return nameWeekDays;
  }

  public getDate() {
    return this.currentDate;
  }

  public getDay() {
    return this.currentDay;
  }

  public getYear() {
    return this.currentYear;
  }

  public getMonths() {
    return nameMonths;
  }

  public getMonth() {
    return this.currentMonth;
  }

  public getMonthName(pos: number) {
    return nameMonths[pos];
  }

  public getAgenda(month: string, year: number): itemDateAgenda[] {
    let filteredData: itemDateAgenda[] = [];
    this.data.forEach(element => {
      if (element.month === month.toLowerCase() && element.year === year) {
        filteredData.push(element);
      }
    })
    return filteredData;
  }

  private isLeap() {
    return ((this.currentYear % 100 !== 0) && (this.currentYear % 4 === 0) || (this.currentYear % 400 === 0));
  }

  private getTotalDays(month: number) {
    if (month === 0 || month === 2 || month === 4 || month === 6 || month === 7 || month === 9 || month === 11) {
      return 31;
    } else if (month === 3 || month === 5 || month === 8 || month === 10) {
      return 30;
    } else {
      this.isLeap() ? 29 : 28;
    }
  }

  public constructMonth(date: Date) {
    let month = [];
    let numberDay = date.getDay();
    for (let i = date.getDate(); i <= this.getTotalDays(date.getMonth()); i++) {
      month.push({ day: i, nameDay: nameWeekDays[numberDay], hasService: false });
      numberDay++;
      if (numberDay === 7) {
        numberDay = 0;
      }
    }
    return month;
  }

}
