import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import { Uris } from '../uris-api';

@Injectable({
    providedIn: 'root'
})
export class HttpService {
    
    static URI = Uris.api;

    private params: HttpParams;

    private headers: HttpHeaders;

    constructor(private http: HttpClient) {
        this.params = new HttpParams();
        this.headers = new HttpHeaders();
    }

    param(key: string, value: string): HttpService {
        this.params = this.params.append(key, value);
        return this;
    }

    header(key: string, value: string): HttpService {
        this.headers = this.headers.set(key, value);
        return this;
    }
  
    get(endpoint: string): Observable<any> {
        return this.http.get(HttpService.URI + endpoint, this.createOptions()).catch(this.handleError);
    }

    post(endpoint: string, body?: Object): Observable<any> {
        return this.http.post(HttpService.URI + endpoint, body, this.createOptions()).catch(this.handleError);
    }

    delete(endpoint: string): Observable<any> {
        return this.http.delete(HttpService.URI + endpoint, this.createOptions()).catch(this.handleError);
    }

    put(endpoint: string, body?: Object): Observable<any> {
        return this.http.put(HttpService.URI + endpoint, body, this.createOptions()).catch(this.handleError);
    }

    patch(endpoint: string, body?: Object): Observable<any> {
        return this.http.patch(HttpService.URI + endpoint, body, this.createOptions()).catch(this.handleError);
    }

    private createOptions() {
        const options = { headers: this.headers, params: this.params };

        this.headers = new HttpHeaders();
        this.params = new HttpParams();

        return options;
    }

    private addBasicAuthIfLogged() {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (this.headers.get('Authorization') == null && currentUser && currentUser.authdata) {
            this.header('Authorization', `Basic ${currentUser.authdata}`)
        }
    }

    private handleError(error: HttpErrorResponse): Observable<HttpErrorResponse> {
        return Observable.throw(error);
    }
}
