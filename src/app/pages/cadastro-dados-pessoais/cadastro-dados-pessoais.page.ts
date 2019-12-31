import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-cadastro-dados-pessoais',
  templateUrl: './cadastro-dados-pessoais.page.html',
  styleUrls: ['./cadastro-dados-pessoais.page.scss'],
})
export class CadastroDadosPessoaisPage implements OnInit {

  public cadastroForm: FormGroup;

  constructor(
    private route: Router,
    public userService: UserService,
    private formBuilder: FormBuilder,
  ) {
    this.cadastroForm = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.pattern('^[a-zA-Z]{3,}( [a-zA-Z]{2,})+$')]],
      sobrenome: [null, [Validators.required, Validators.pattern('^[a-zA-Z]{2,}( [a-zA-Z]{2,})*$')]],
      email: [null, [Validators.required, Validators.email]],
      senha: [null, [Validators.required, Validators.pattern('^.{6,}$')]],
      telefone: [null, [Validators.required]]
    });
  }

  ngOnInit() {

  }

  public formatTelefone() {
    if (this.cadastroForm.value.telefone) {
      let tempTel: string = this.cadastroForm.value.telefone;
      tempTel = tempTel.replace(/[^0-9]/g, '').replace(/([0-9]{2})([0-9]{1})/, "($1) $2").replace(/(\([0-9]{2}\) [0-9]{5})([0-9]{1})/, "$1-$2");
      this.cadastroForm.patchValue({
        telefone: tempTel
      });
    }
  }

  public goToDocumentos(): void {
    this.userService.newUser.nome = this.cadastroForm.value.nome;
    this.userService.newUser.sobrenome = this.cadastroForm.value.sobrenome;
    this.userService.newUser.email = this.cadastroForm.value.email;
    this.userService.newUser.senha = this.cadastroForm.value.senha;
    this.userService.newUser.ddd = Number(this.cadastroForm.value.telefone.substr(1, 2));
    this.userService.newUser.numero = this.cadastroForm.value.telefone.substr(5);
    this.route.navigateByUrl('selecao-documento');
  }

}
