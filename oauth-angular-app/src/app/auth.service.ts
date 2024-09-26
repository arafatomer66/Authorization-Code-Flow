import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000'; // Backend URL

  constructor(private http: HttpClient, private router: Router) {}

  // Method to trigger OAuth login
  login() {
    window.location.href = `${this.apiUrl}/login`; // Redirect to backend login route
  }

  // Handle OAuth callback and token exchange
  handleAuthCallback() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      // Call backend to exchange code for access token
      this.http.get(`${this.apiUrl}/callback?code=${code}`).subscribe((tokens: any) => {
        localStorage.setItem('access_token', tokens.access_token);
        this.router.navigate(['/home']);
      });
    }
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token');
  }

  // Logout user and remove token
  logout() {
    localStorage.removeItem('access_token');
    this.router.navigate(['/']);
  }
}
