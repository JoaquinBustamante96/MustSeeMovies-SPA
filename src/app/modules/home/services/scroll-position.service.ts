import { Injectable } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';

@Injectable({
    providedIn: 'root'
})

export class ScrollPositionerService {

    private previousUrl: string;
    private homeUrls = ['/', '/byFilter', '/byName'];
    private previousHomePositionY: number;

    constructor(private router: Router) {
        this.router.events.subscribe(
            event => {
                if (event instanceof NavigationStart && this.homeUrls.includes(this.router.url)) {
                    this.previousHomePositionY = window.scrollY;
                }
                else if (event instanceof NavigationEnd) {

                    if (this.previousUrl && this.previousHomePositionY
                        && event.url == this.homeUrls[0]) {
                        setTimeout(
                            () => window.scrollTo(0, this.previousHomePositionY), 200)
                    }
                    else if (event.url == this.homeUrls[1] || event.url == this.homeUrls[2]) {
                        window.scrollTo(0,window.innerHeight * 90 / 100);
                    }

                    this.previousUrl = event.url;
                }
            }

        )
    }

}
