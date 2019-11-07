import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';

import { Geolocation, GeolocationOptions, Geoposition } from '@ionic-native/geolocation/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { Observable } from 'rxjs';
import { MapService } from '../map/map.service';

@Injectable({
  providedIn: 'root'
})
export class GpsService {

  private watchPositionSubscriber: Observable<Geoposition>;
  private _myPosition: Geoposition;

  constructor(
    private platform: Platform,
    private geolocation: Geolocation,
    private locationAccuracy: LocationAccuracy
  ) {
    const GPS_OPTIONS: GeolocationOptions = {
      enableHighAccuracy: true
    }

    this.geolocation.getCurrentPosition(GPS_OPTIONS).then((position: Geoposition) => {
      this._myPosition = position;
    })
  }

  get myPosition(): Geoposition {
    return this._myPosition;
  }

  set myPosition(myPosition: Geoposition) {
    this._myPosition = myPosition;
  }

  public requestFullPermission() {
    if (this.platform.is('android') || this.platform.is('ios') && document.URL.startsWith('http://localhost:81')) {
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
    this.watchPositionSubscriber.subscribe((position: Geoposition) => {
      this.myPosition = position;
    });
  }
}
