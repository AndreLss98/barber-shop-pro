import { Component, OnInit } from '@angular/core';
import { MapService } from 'src/app/services/map/map.service';
import { GpsService } from 'src/app/services/gps/gps.service';

@Component({
  selector: 'app-rota',
  templateUrl: './rota.page.html',
  styleUrls: ['./rota.page.scss'],
})
export class RotaPage implements OnInit {


  private content: HTMLElement;

  constructor(
    private mapService: MapService,
    private gpsService: GpsService
  ) {

  }

  ngOnInit() {
    this.content = document.getElementById('content');
    this.content.appendChild(this.mapService.mapElement);
    this.mapService.configMap();
    this.mapService.initializeMapMarkers();
    this.mapService.initializeRoute();
  }

  ionViewDidEnter() {
    setTimeout(() => {
      this.mapService.map.resize();
    }, 500);
  }

}
