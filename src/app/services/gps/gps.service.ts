import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';
import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { Geolocation, GeolocationOptions, Geoposition } from '@ionic-native/geolocation/ngx';

import { BASE_URL_GRAPHQL } from 'src/environments/environment';
import { HTTP_OPTIONS, TIMEOUT_SIZE } from 'src/app/constants/http-constants';

import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class GpsService {

  private _myPosition: Geoposition;
  private watchPositionSubscriber: Observable<Geoposition>;

  constructor(
    private http: HttpClient,
    private platform: Platform,
    private userService: UserService,
    private geolocation: Geolocation,
    private locationAccuracy: LocationAccuracy,
  ) {
    this.geolocation.getCurrentPosition({ enableHighAccuracy: true }).then((position: Geoposition) => {
      this._myPosition = position;
    });
  }

  get myPosition(): Geoposition {
    return this._myPosition;
  }

  set myPosition(myPosition: Geoposition) {
    this._myPosition = myPosition;
  }

  public requestFullPermission() {
    if (this.platform.is('android') || this.platform.is('ios') && !document.URL.startsWith('http://localhost:81')) {
      this.locationAccuracy.canRequest().then(() => {
        this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(() => {
          this.initializeWatchPosition();
        }).catch((error) => console.log(error));
      }).catch((error) => console.log(error));
    }
  }

  public initializeWatchPosition() {
    const GPS_OPTIONS: GeolocationOptions = {
      enableHighAccuracy: true
    }
    this.watchPositionSubscriber = this.geolocation.watchPosition(GPS_OPTIONS);
    this.watchPositionSubscriber.pipe(debounceTime(2000)).subscribe((position: Geoposition) => {
      this.myPosition = position;
    });
  }

  public updateLocation() {
    this.geolocation.getCurrentPosition().then(({coords}) => {
      const body =
      `mutation {
        updateProfissionalPosition(idprofissional: ${this.userService.user.idprofissional}, latitude: ${coords.latitude}, longitude: ${coords.longitude})
      }`;
      this.http.post(BASE_URL_GRAPHQL, body, HTTP_OPTIONS).pipe(timeout(TIMEOUT_SIZE)).subscribe((response: any) => {
        console.log(response);
      });
    })
  }
}
