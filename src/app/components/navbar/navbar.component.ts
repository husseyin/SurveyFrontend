import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  visibility: boolean;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.isVisibility();
  }

  exit() {
    this.router.navigate(['/']).then((reload) => {
      window.localStorage.clear();
      window.location.reload();
    });
  }

  isVisibility() {
    if (window.localStorage.getItem('token')) {
      this.visibility = true;
    } else {
      this.visibility = false;
    }
  }
}
