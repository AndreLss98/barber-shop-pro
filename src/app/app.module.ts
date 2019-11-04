import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouteReuseStrategy } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { Network } from '@ionic-native/network/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { IntroModalPage } from './pages/modals/intro-modal/intro-modal.page';
import { RecuperarSenhaPage } from './pages/modals/recuperar-senha/recuperar-senha.page';
import { ConnectionStatusComponent } from './pages/modals/connection-status/connection-status.component';

@NgModule({
  declarations: [AppComponent, IntroModalPage, RecuperarSenhaPage, ConnectionStatusComponent],
  entryComponents: [IntroModalPage, RecuperarSenhaPage, ConnectionStatusComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    IonicModule.forRoot()
  ],
  providers: [
    Network,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
