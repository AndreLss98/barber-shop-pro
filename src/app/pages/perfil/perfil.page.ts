import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  public isExpendedName: boolean = false;
  public arrowName: string = 'ios-arrow-forward';

  constructor(
    private route: Router,
    public userService: UserService,
  ) {

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
