import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'avaliacao',
  templateUrl: './avaliacoes.component.html',
  styleUrls: ['./avaliacoes.component.scss'],
})
export class AvaliacoesComponent implements OnInit {

  @Input() ava: number;
  public iconFace: string;

  public stars = [
    {
      iconSrc: 'assets/emptyStar.svg'
    },
    {
      iconSrc: 'assets/emptyStar.svg'
    },
    {
      iconSrc: 'assets/emptyStar.svg'
    },
    {
      iconSrc: 'assets/emptyStar.svg'
    },
    {
      iconSrc: 'assets/emptyStar.svg'
    }
  ]

  constructor() {

  }

  ngOnInit() {
    if (this.ava <= 3) {
      this.iconFace = 'assets/sadFace.svg';
    } else {
      this.iconFace = 'assets/happyFace.svg';
    }
    this.fillStars();
  }

  private fillStars() {
    for (let i = 0; i < this.ava; i++) {
      this.stars[i].iconSrc = 'assets/fullStar.svg';
    }
  }

}
