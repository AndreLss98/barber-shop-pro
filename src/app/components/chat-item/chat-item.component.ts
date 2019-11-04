import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'chat-item',
  templateUrl: './chat-item.component.html',
  styleUrls: ['./chat-item.component.scss'],
})
export class ChatItemComponent implements OnInit {

  @Input() nome: string;
  @Input() ulitmaMensagem: string;
  @Input() hora: string;

  constructor() {

  }

  ngOnInit() {
    
  }

}
