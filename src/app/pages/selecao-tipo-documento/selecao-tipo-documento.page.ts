import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-selecao-tipo-documento',
  templateUrl: './selecao-tipo-documento.page.html',
  styleUrls: ['./selecao-tipo-documento.page.scss'],
})
export class SelecaoTipoDocumentoPage implements OnInit {

  constructor(private route: Router) {

  }

  ngOnInit() {

  }

  public initializeCadastro(): void {
    this.route.navigateByUrl('');
  }

}
