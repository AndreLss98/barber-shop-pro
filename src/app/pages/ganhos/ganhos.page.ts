import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { BankService } from 'src/app/services/bank/bank.service';
import { AlertController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
    public bankService: BankService,
    private formBuilder: FormBuilder,
    private alertController: AlertController,
  ) {
    this.bankForm = this.formBuilder.group({
      name: ['', Validators.required],
      bank: ['', Validators.required],
      agency: [null, Validators.required],
      contaCorrente: [null, Validators.required],
      cpf: [null, Validators.required]
    });
  }

  ngOnInit() {

  }

  public seeAllPayments(): void {
    this.route.navigateByUrl('pagamentos');
  }

  public saveCard(): void {
    this.alertController.create({
      message: 'Dados bancários salvo com sucesso!',
      mode: 'ios',
      backdropDismiss: false,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.bankService.myBank = this.bankForm.value;
            this.bankService.isCadastro = false;
          }
        }
      ]
    }).then((alert) => alert.present());
  }

}
