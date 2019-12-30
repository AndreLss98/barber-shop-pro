import { Component, OnInit } from '@angular/core';

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-pagamentos',
  templateUrl: './pagamentos.page.html',
  styleUrls: ['./pagamentos.page.scss'],
})
export class PagamentosPage implements OnInit {

  constructor(
    public userService: UserService
  ) {

  }

  ngOnInit() {

  }



}
