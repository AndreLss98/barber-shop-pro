import { Component, OnInit } from '@angular/core';

import { chat } from 'src/app/models/chat.model';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  public conversas: chat;

  constructor(
    private route: ActivatedRoute,
    private actionSheetCtrl: ActionSheetController
  ) {

  }

  ngOnInit() {
    if (this.route.snapshot.data['chat']) {
      this.conversas = this.route.snapshot.data['chat'];
    }
  }

  public deleteChat(): void {
    this.actionSheetCtrl.create({
      header: 'Ao excluir, você perderá todas as mensagens.',
      buttons: [
        {
          text: 'Excluir o chat',
          role: 'destructive'
        },
        {
          text: 'Cancelar',
          role: 'cancel'
        }
      ],
      mode: 'ios'
    }).then((action) => {
      action.present();
    });
  }

}
