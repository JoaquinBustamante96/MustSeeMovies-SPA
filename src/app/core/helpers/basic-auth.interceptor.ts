import { Injectable } from "@angular/core";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from "@angular/common/http";
import { AuthenticationService } from "../services/authentication.service";
import { Observable } from "rxjs/Observable";


@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {

    constructor(private auth: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(this.addAuthenticationToken(request));
    }

    addAuthenticationToken(request) {

        const basicAuth = this.auth.getBasicAuth();
        if (!basicAuth) {
            return request;
        }

        return request.clone({
            setHeaders: {
                Authorization: basicAuth
            }
        });
    }
}