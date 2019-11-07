import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ChatResolverService } from './resolvers/chat-resolver.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'intro',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
  },
  { path: 'intro', loadChildren: './pages/intro/intro.module#IntroPageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'agenda', loadChildren: './pages/agenda/agenda.module#AgendaPageModule' },
  { path: 'perfil', loadChildren: './pages/perfil/perfil.module#PerfilPageModule' },
  { path: 'home-chat', loadChildren: './pages/home-chat/home-chat.module#HomeChatPageModule' },
  { 
    path: 'chat/:id',
    resolve: {
      chat: ChatResolverService
    },
    loadChildren: './pages/chat/chat.module#ChatPageModule'
  },
  { path: 'historico', loadChildren: './pages/historico/historico.module#HistoricoPageModule' },
  { path: 'ganhos', loadChildren: './pages/ganhos/ganhos.module#GanhosPageModule' },
  { path: 'pagamentos', loadChildren: './pages/pagamentos/pagamentos.module#PagamentosPageModule' },
  { path: 'prices', loadChildren: './pages/prices/prices.module#PricesPageModule' },
  { path: 'cadastro-dados-pessoais', loadChildren: './pages/cadastro-dados-pessoais/cadastro-dados-pessoais.module#CadastroDadosPessoaisPageModule' },
  { path: 'selecao-documento', loadChildren: './pages/selecao-tipo-documento/selecao-tipo-documento.module#SelecaoTipoDocumentoPageModule' },
  { path: 'fotos-documento', loadChildren: './pages/fotos-documento/fotos-documento.module#FotosDocumentoPageModule' },  { path: 'selfie', loadChildren: './pages/selfie/selfie.module#SelfiePageModule' },
  { path: 'rota', loadChildren: './pages/rota/rota.module#RotaPageModule' }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
