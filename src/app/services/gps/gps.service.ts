import { Observable } from 'rxjs';
import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';

import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { Geolocation, GeolocationOptions, Geoposition } from '@ionic-native/geolocation/ngx';
import { debounceTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GpsService {

  private _myPosition: Geoposition;
  private watchPositionSubscriber: Observable<Geoposition>;

  constructor(
    private platform: Platform,
    private geolocation: Geolocation,
    private locationAccuracy: LocationAccuracy
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
    this.watchPositionSubscriber.pipe(debounceTime(2000)).subscribe((position: Geoposition) => {
      this.myPosition = position;
    });
  }
}
