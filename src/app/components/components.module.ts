import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ChatItemComponent } from './chat-item/chat-item.component';
import { PagamentosComponent } from './pagamentos/pagamentos.component';
import { AvaliacoesComponent } from './avaliacoes/avaliacoes.component';
import { AgencyDataComponent } from './agency-data/agency-data.component';
import { ItemAgendaComponent } from './item-agenda/item-agenda.component';
import { MesAgendaComponent } from './popovers/mes-agenda/mes-agenda.component';
import { HistoricoItemComponent } from './historico-item/historico-item.component';

@NgModule({
  declarations: [
    ChatItemComponent,
    MesAgendaComponent,
    AgencyDataComponent,
    ItemAgendaComponent,
    PagamentosComponent,
    AvaliacoesComponent,
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
    AvaliacoesComponent,
    HistoricoItemComponent
  ]
})
export class ComponentsModule { }
