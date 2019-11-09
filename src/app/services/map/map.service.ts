import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import mapbox from 'mapbox-gl';
import { GpsService } from '../gps/gps.service';

import { MAPBOX_TOKEN, MAP_STYLE, MAPBOX_SERVICE_BASE_URL } from '../../../environments/environment';

const CUSTOM_LOCATION = [-16.663067, -49.262920]

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private _map: mapbox.Map;
  private _mapElement: HTMLDivElement;
  private _myPositionMarker: mapbox.Marker;
  private _myPositionMarkerElement: HTMLDivElement;
  private _clientPosition: mapbox.Marker;

  constructor(
    private http: HttpClient,
    private gpsService: GpsService,
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
    this.createRouteSource();
  }

  public initializeMapMarkers() {
    this._myPositionMarkerElement =  document.createElement('div');
    this._myPositionMarkerElement.id = 'myMarker';
    let img = document.createElement('div');
    img.classList.add('img');
    this._myPositionMarkerElement.appendChild(img);
    img.appendChild(document.createElement('img'));
    if (!this._myPositionMarker) {
      this._myPositionMarker = new mapbox.Marker(this._myPositionMarkerElement).setLngLat([this.gpsService.myPosition.coords.longitude, this.gpsService.myPosition.coords.latitude]);
      this._myPositionMarker.addTo(this._map);
    } else {
      this._myPositionMarker.setLngLat([this.gpsService.myPosition.coords.longitude, this.gpsService.myPosition.coords.latitude]);
    }

    if (!this._clientPosition) {
      this._clientPosition = new mapbox.Marker({ color: '#DC143C' }).setLngLat([CUSTOM_LOCATION[1], CUSTOM_LOCATION[0]]);
      this._clientPosition.addTo(this._map);
    } else {
      this._clientPosition.setLngLat([CUSTOM_LOCATION[1], CUSTOM_LOCATION[0]]);
    }
  }

  public initializeRoute() {
    this.getRoute(this.gpsService.myPosition).subscribe((response: any) => {
      let geojson = {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: response.routes[0].geometry.coordinates
        }
      };
      setTimeout(() => {
        if (this._map.isSourceLoaded('routes')) {
          this._map.getSource('routes').setData(geojson);
          this.createTimeTravelBallon(response.routes[0].duration);
        }
      }, 1000);
    })
  }

  private createTimeTravelBallon(time: number) {
    let ballon: HTMLDivElement = document.createElement('div');
    let timeElement: HTMLSpanElement = document.createElement('span');
    timeElement.textContent = `${Math.floor(time/60)} min de você`;
    ballon.id = 'timeTravel';
    ballon.appendChild(timeElement);
    this._myPositionMarkerElement.appendChild(ballon);
  }

  private createRouteLayer() {
    this._map.addLayer({
      id: "Route",
      type: "line",
      source: "routes",
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-color': '#f1dccc',
        'line-width': 5,
        'line-opacity': 0.75,
        'line-dasharray': [1, 2]
      }
    });
  }

  private createRouteSource() {
    this._map.on('load', () => {
      this._map.addSource("routes", {
        type: 'geojson',
        data: {
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [-77.0323, 38.9131]
          },
          "properties": {
            "title": "Mapbox DC",
            "marker-symbol": "monument"
          }
        }
      });
      setTimeout(() => {
        if (this._map.isSourceLoaded('routes')) {
          this.createRouteLayer();
        }
      }, 1000);
    });
  }

  public configMap(): void {
    this._map.setCenter([this.gpsService.myPosition.coords.longitude, this.gpsService.myPosition.coords.latitude]);
    this.map.resize();
  }

  public getRoute({ coords }) {
    const SERVICE = `directions/v5/mapbox/driving/${coords.longitude},${coords.latitude};-49.262920,-16.663067?steps=true&geometries=geojson&access_token=${MAPBOX_TOKEN}`;
    return this.http.get(`${MAPBOX_SERVICE_BASE_URL}${SERVICE}`);
  }
}
