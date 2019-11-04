import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ganhos',
  templateUrl: './ganhos.page.html',
  styleUrls: ['./ganhos.page.scss'],
})
export class GanhosPage implements OnInit {

  public typeView: string = 'saldo';

  constructor(private route: Router) {

  }

  ngOnInit() {

  }

  public seeAllPayments(): void {
    this.route.navigateByUrl('pagamentos');
  }

}
