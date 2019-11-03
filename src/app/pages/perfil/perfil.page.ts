import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  public isExpendedName: boolean = false;
  public arrowName: string = 'ios-arrow-forward';

  constructor(private route: Router) {

  }

  ngOnInit() {

  }

  public logout() {
    this.route.navigateByUrl('login');
  }

  public extendColName() {
    this.isExpendedName = !this.isExpendedName;
    this.isExpendedName? this.arrowName = 'ios-arrow-down' : this.arrowName = 'ios-arrow-forward';
  }

}
