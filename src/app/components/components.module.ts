import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ItemAgendaComponent } from './item-agenda/item-agenda.component';
import { MesAgendaComponent } from './popovers/mes-agenda/mes-agenda.component';
import { ChatItemComponent } from './chat-item/chat-item.component';
import { HistoricoItemComponent } from './historico-item/historico-item.component';
import { PagamentosComponent } from './pagamentos/pagamentos.component';
import { AgencyDataComponent } from './agency-data/agency-data.component';

@NgModule({
  declarations: [
    ChatItemComponent,
    MesAgendaComponent,
    AgencyDataComponent,
    ItemAgendaComponent,
    PagamentosComponent,
    HistoricoItemComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  exports: [
    ChatItemComponent,
    MesAgendaComponent,
    AgencyDataComponent,
    ItemAgendaComponent,
    PagamentosComponent,
    HistoricoItemComponent
  ]
})
export class ComponentsModule { }
