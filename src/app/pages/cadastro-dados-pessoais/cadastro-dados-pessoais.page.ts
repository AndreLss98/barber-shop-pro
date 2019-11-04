import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastro-dados-pessoais',
  templateUrl: './cadastro-dados-pessoais.page.html',
  styleUrls: ['./cadastro-dados-pessoais.page.scss'],
})
export class CadastroDadosPessoaisPage implements OnInit {

  public cadastroForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.cadastroForm = this.formBuilder.group({
      name: [null, [Validators.minLength(3), Validators.required]],
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.minLength(6), Validators.required]],
      telefone: [null, [Validators.required]]
    });
  }

  ngOnInit() {

  }

}
