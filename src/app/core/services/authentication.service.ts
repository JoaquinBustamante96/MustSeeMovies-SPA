import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    constructor(private httpService: HttpService, private router: Router) { }

    login(username: string, password: string): Observable<any> {

        return this.httpService
            .header('Authorization', 'Basic ' + btoa(username + ':' + password))
            .post('/user/login').map(token => {
                if (token) {
                    token.authdata = btoa(token.token + ':');
                    localStorage.setItem('currentUser', JSON.stringify(token));
                }
            });
    }

    logout() {
        if (localStorage.getItem('currentUser')) {
            localStorage.removeItem('currentUser');
            window.location.reload();
        }
    }

    getAccessToken(): string {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'))
        if (currentUser) {
            return currentUser['authdata'];
        }
        return null;
    }

}