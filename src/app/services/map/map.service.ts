import { Injectable } from '@angular/core';
import { MAPBOX_TOKEN } from '../../../environments/environment';

import mapbox from 'mapbox-gl';
import { GpsService } from '../gps/gps.service';

const MAP_STYLE = 'mapbox://styles/dionim/cjzwtgft014k41csdy9xmjcyq';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private _map: mapbox.Map;
  private _mapElement: HTMLDivElement;
  private _myPositionMarker: mapbox.Marker;

  constructor(
    private gpsService: GpsService
  ) {
    mapbox.accessToken = MAPBOX_TOKEN;
    this.generateMapContainer();
  }

  get mapElement(): HTMLDivElement {
    return this._mapElement;
  }

  set mapElement(mapElement: HTMLDivElement) {
    this._mapElement = mapElement;
  }

  get map(): mapbox.Map {
    return this._map;
  }

  set map(mapService: mapbox.Map) {
    this._map = mapService;
  }

  private generateMapContainer() {
    this._mapElement = document.createElement('div');
    this._mapElement.id = 'map';
    this._mapElement.style.height = '100%';
  }

  public initializeMap() {
    this._map = new mapbox.Map({
      container: this._mapElement,
      style: MAP_STYLE,
      zoom: 14
    });
  }

  public configMap(): void {
    this.map.setCenter([this.gpsService.myPosition.coords.longitude, this.gpsService.myPosition.coords.latitude]);
    this.map.on('load', () => this.map.resize());
  }

  public initializeMyMarker() {
    this._myPositionMarker = new mapbox.Marker({color : '#D6A763' }).setLngLat([this.gpsService.myPosition.coords.longitude, this.gpsService.myPosition.coords.latitude]);
    this._myPositionMarker.addTo(this._map);
  }
}
