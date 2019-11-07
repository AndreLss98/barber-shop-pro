import { Component, OnInit } from '@angular/core';
import { MapService } from 'src/app/services/map/map.service';

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {

  private content: HTMLElement;

  constructor(
    private mapService: MapService
  ) {

  }

  ngOnInit() {
    this.content = document.getElementById('mapContent');
    if (this.content) {
      this.content.append(this.mapService.mapElement);
    }
  }

}
