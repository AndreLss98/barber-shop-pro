import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { NOME_DIAS_SEMANA } from './../../constants/constants';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {

  readonly NOME_DIAS_SEMANA = NOME_DIAS_SEMANA;

  constructor(
    private route: Router
  ) {

  }

  ngOnInit() {
    
  }

  public goToLogin(): void {
    this.route.navigateByUrl('/login');
  }

  public selectDay(obj: HTMLElement) {
    if (obj.classList.length === 1) {
      obj.classList.add('selected');
    } else {
      obj.classList.remove('selected');
    }
  }

}
