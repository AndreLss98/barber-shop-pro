import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';

import { MapService } from './../services/map/map.service';

@Injectable({
  providedIn: 'root'
})
export class RouterResolverService implements Resolve<any> {

  constructor(private mapService: MapService) {

  }

  resolve() {
    return this.mapService.currentClientAddress;
  }
  
}
