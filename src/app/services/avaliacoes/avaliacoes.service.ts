import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AvaliacoesService {

  public data = [
    {
      score: 3
    },
    {
      score: 4
    },
    {
      score: 2
    }
  ]

  constructor() {

  }

  public getRatings() {
    return this.data;
  }
}
