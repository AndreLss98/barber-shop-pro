import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { UserService } from 'src/app/services/user.service';
import { BankService } from 'src/app/services/bank/bank.service';

@Component({
  selector: 'app-ganhos',
  templateUrl: './ganhos.page.html',
  styleUrls: ['./ganhos.page.scss'],
})
export class GanhosPage implements OnInit {

  public bankForm: FormGroup;

  public typeView: string = 'saldo';
  public isCadastro: boolean = false;

  constructor(
    private route: Router,
    public userService: UserService,
    private bankService: BankService,
    private formBuilder: FormBuilder,
    private alertController: AlertController,
  ) {
    this.bankForm = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.pattern('^[a-zA-Z]{3,}( [a-zA-Z]{2,})+$')]],
      banco: ['', [Validators.required, Validators.pattern('^[a-zA-Z]{2,}$')]],
      contacorrente: ['', Validators.required],
      agencia: ['', [Validators.required, Validators.pattern('^[1234567890]{3,4}$')]],
      cnpj: [null, [Validators.required, Validators.pattern('^(([1234567890]{11})|([1234567890]{14}))$')]]
    });
  }

  ngOnInit() {
    if (this.userService.user.contabancaria) {
      this.bankForm.patchValue({
        ...this.userService.user.contabancaria
      })
    }
  }

  ionViewWillLeave() {
    this.userService.isAccountRegister = false;
  }

  public resetForm() {
    this.bankForm.reset()
  }

  public formatContaCorrente() {
    if (this.bankForm.value.contacorrente) {
      let tempStr: string = this.bankForm.value.contacorrente.toString();
      if (tempStr.length > 10) {
        tempStr = tempStr.slice(0, 10);
      }
      this.bankForm.patchValue({
        contacorrente: tempStr
      })
    }
  }

  public formatAgency() {
    if (this.bankForm.value.agencia) {
      let tempStr: string = this.bankForm.value.agencia.toString();
      if (tempStr.length > 4) {
        this.bankForm.patchValue({
          agencia: Number(tempStr.slice(0, 4))
        })
      }
    }
  }

  public formatCPF() {
    if (this.bankForm.value.cnpj) {
      let tempStr: string = this.bankForm.value.cnpj.toString();
      if (tempStr.length > 14) {
        this.bankForm.patchValue({
          cnpj: Number(tempStr.slice(0, 14))
        })
      }
    }
  }

  public seeAllPayments(): void {
    this.route.navigateByUrl('pagamentos');
  }

  public saveCard() {
    this.bankService.registerBankAccount(this.bankForm.value).subscribe((response: any) => {
      if (response.errors) {
        console.error(response);
      } else {
        this.userService.user.contabancaria = response.data.contabancaria;
        console.log(this.userService.user.contabancaria);
        this.showAlert();
      }
    });
  }

  public showAlert(): void {
    this.alertController.create({
      message: 'Dados bancários salvo com sucesso!',
      mode: 'ios',
      backdropDismiss: false,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.userService.isAccountRegister = false;
          }
        }
      ]
    }).then((alert) => alert.present());
  }

}
