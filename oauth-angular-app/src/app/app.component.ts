
import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'oauth-angular-app';


  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.handleAuthCallback(); // Handle OAuth callback
  }
}
