import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { Token } from '../../shared/models/token.mode';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    private user = "/user";
    private _login = "/login";
    private forgot = "/forgot-password"
    private reset = "/reset";
    private password = "/password";

    private hasSingIn$: BehaviorSubject<boolean>;


    constructor(private httpService: HttpService, private router: Router) {
        this.hasSingIn$ = new BehaviorSubject<boolean>(this.hasSignIn());
    }

    login(username: string, password: string): Observable<any> {

        return this.httpService
            .header('Authorization', 'Basic ' + btoa(username + ':' + password))
            .post(this.user + this._login)
            .map(token => {
                if (token) {
                    this.saveToken(token);
                }
                return token;
            });
    }

    logout() {
        if (localStorage.getItem('currentUser')) {
            localStorage.removeItem('currentUser');
            window.location.reload();
        }
    }

    forgotPassword(email: string): Observable<any> {
        return this.httpService.param('email', email).post(this.forgot);
    }

    signUp(email: string, password: string): Observable<any> {
        return this.httpService
            .post(this.user, { 'email': email, 'password': password });
    }

    getBasicAuth(): string {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'))
        if (currentUser) {
            return `Basic ${btoa(this.getAccessToken() + ":")}`;
        }
        return null;
    }

    hasSignIn(): boolean {
        return this.getAccessToken() != null;
    }

    getHasSignIn(): Observable<boolean> {
        return this.hasSingIn$.asObservable();
    }

    getAccessToken(): string {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'))
        if (currentUser) {
            return currentUser.token;
        }
        return null;
    }

    resetForgottenPassword(password: string, token: string): Observable<Token> {
        return this.httpService.put(this.user + this.reset + this.password, {
            'password': password,
            'resetToken': token
        }).map(token => {
            this.saveToken(token);
            return token;
        });
    }

    private saveToken(token: string) {
        localStorage.setItem('currentUser', JSON.stringify(token));
        this.hasSingIn$.next(this.hasSignIn());
    }

}