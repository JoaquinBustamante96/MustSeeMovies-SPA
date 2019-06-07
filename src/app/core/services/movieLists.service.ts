import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Uris } from '../uris-api';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
    providedIn: 'root'
})

export class MovieListsService {

    constructor(private httpService: HttpService, private authService: AuthenticationService) { }

    addMovieToList(list: string, id: string): Observable<any> {
        return this.httpService
            .param('list', list)
            .param('id', id)
            .put(`${Uris.list}${Uris.movie}`);
    }

    removeMovieFromList(list: string, id: string): Observable<any> {
        return this.httpService
            .param('list', list)
            .param('id', id)
            .delete(`${Uris.list}${Uris.movie}`);
    }

    isMovieInList(id: string) {
        return this.httpService
            .param('id', id)
            .get(Uris.list+Uris.movie);
    }

}