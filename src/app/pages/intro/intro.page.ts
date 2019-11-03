import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {

  constructor(private route: Router) {

  }

  ngOnInit() {
    
  }

  public goToLogin(): void {
    this.route.navigateByUrl('/login');
  }

}
