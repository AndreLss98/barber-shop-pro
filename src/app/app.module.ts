import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { environment } from 'src/environments/environment';

import { File } from '@ionic-native/file/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { Network } from '@ionic-native/network/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';

import { AppComponent } from './app.component';
import { SocketIoModule } from 'ngx-socket-io';
import { AppRoutingModule } from './app-routing.module';

import { IntroModalPage } from './pages/modals/intro-modal/intro-modal.page';
import { RecuperarSenhaPage } from './pages/modals/recuperar-senha/recuperar-senha.page';

import { InfoComponent } from './pages/modals/info/info.component';
import { CustomMenuComponent } from './pages/modals/custom-menu/custom-menu.component';
import { ConnectionStatusComponent } from './pages/modals/connection-status/connection-status.component';
import { AvisoAgendamentoComponent } from './pages/modals/aviso-agendamento/aviso-agendamento.component';
import { UserUnauthorizedComponent } from './pages/modals/user-unauthorized/user-unauthorized.component';
import { NotificacaoAgendaComponent } from './pages/modals/notificacao-agenda/notificacao-agenda.component';

@NgModule({
  declarations: [
    AppComponent,
    InfoComponent,
    IntroModalPage,
    RecuperarSenhaPage,
    CustomMenuComponent,
    AvisoAgendamentoComponent,
    ConnectionStatusComponent,
    UserUnauthorizedComponent,
    NotificacaoAgendaComponent,
  ],
  entryComponents: [
    InfoComponent,
    IntroModalPage,
    RecuperarSenhaPage,
    CustomMenuComponent,
    AvisoAgendamentoComponent,
    ConnectionStatusComponent,
    UserUnauthorizedComponent,
    NotificacaoAgendaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    IonicModule.forRoot(),
    SocketIoModule.forRoot(environment.socketIoConfig)
  ],
  providers: [
    File,
    Camera,
    Network,
    StatusBar,
    Geolocation,
    FileTransfer,
    InAppBrowser,
    SplashScreen,
    LocationAccuracy,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
