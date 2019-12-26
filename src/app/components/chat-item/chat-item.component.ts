import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'chat-item',
  templateUrl: './chat-item.component.html',
  styleUrls: ['./chat-item.component.scss'],
})
export class ChatItemComponent implements OnInit {

  @Input() nome: string;
  @Input() ulitmaMensagem: string;
  @Input() timestamp: string = '';

  private horas: string;
  private minutos: string;

  public horarioFormatado: string = '';

  constructor() {
     
  }

  ngOnInit() {

  }

  ngAfterContentChecked() {
    if (this.timestamp) {
      const date = new Date(Number(this.timestamp));
      this.horarioFormatado = (date.getHours()) + ':' +  ("0" + date.getMinutes()).substr(-2);
    }
  }
}
