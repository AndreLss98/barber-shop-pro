import { Component, OnInit } from '@angular/core';

import { AgendaService } from 'src/app/services/agenda.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {

  public days: string[] = [];
  public slideDaysConfig = {
    spaceBetween: 5,
    centeredSlides: true,
    slidesPerView: 3
  };

  constructor(
    private agendaServices: AgendaService
  ) {

  }

  ngOnInit() {
    this.days = this.agendaServices.getWeekDays();
  }

}
