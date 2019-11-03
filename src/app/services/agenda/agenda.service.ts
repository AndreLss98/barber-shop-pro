import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  private weekDays: string[] = [ 'DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB' ];

  constructor() {

  }

  public getWeekDays(): string[] {
    return this.weekDays;
  }
}
