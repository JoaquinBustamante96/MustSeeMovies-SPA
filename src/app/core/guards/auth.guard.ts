import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Token } from '../../shared/models/token.mode';


@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const token:Token = JSON.parse(localStorage.getItem('currentUser'));
        if (token && token.roles.includes('ADMIN')) {
            return true;
        }
        this.router.navigate(['admin/login'], { queryParams: { returnUrl: state.url } });
        return false;

    }
}