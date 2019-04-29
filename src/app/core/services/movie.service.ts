import { Injectable } from "@angular/core";
import { HttpService } from "@app/core/services/http.service";
import { Filter } from '../models/filter.model';
import { MinimunMovie } from '@app/core/models';
import { Page, Movie } from '@app/core/models';
import { Observable, Subject } from 'rxjs';
import { MinimunMoviePage } from '@app/core/models';
import { Uris } from '@app/core/uris-api';

@Injectable({
    providedIn: 'root'
})

export class MovieService {

    private minimunMoviesPage$: Subject<Page<MinimunMovie>> = new Subject();
    private movie$: Subject<Movie> = new Subject();
    private relatedMoviesPage$: Subject<Page<MinimunMovie>> = new Subject();
    private movieNames$: Subject<string[]> = new Subject();

    constructor(private httpService: HttpService) { }

    getMoviesPage(): Observable<Page<MinimunMovie>> {
        return this.minimunMoviesPage$.asObservable();
    }

    getMovie(id: string): Observable<Movie> {
        this.getMovieById(id).subscribe(
            movie => this.movie$.next(new Movie().deserialize(movie))
        )
        return this.movie$.asObservable();
    }

    private getMovieById(id: string): Observable<any> {
        return this.httpService.get(`${Uris.movie}/${id}`);
    }

    FilterMoviePage(filter: Filter, pageNumber: number, size: number) {
        this.getFilteredMoviesPage(filter, pageNumber, size).subscribe(
            response => {
                this.minimunMoviesPage$.next(new MinimunMoviePage().deserialize(response));
            }
        )
    }

    searchByName(name: string, pageNumber, size) {
        this.httpService
            .param("page", pageNumber)
            .param('size', size)
            .get(`${Uris.movie+Uris.filter+Uris.Name}/${name}`)
            .subscribe(
                response => this.minimunMoviesPage$.next(new MinimunMoviePage().deserialize(response))
            )
    }

    private getFilteredMoviesPage(filter: Filter, pageNumber, size): Observable<any> {
        return this.httpService
            .param('page', pageNumber)
            .param('size', size)
            .param('language', filter.language)
            .param('country', filter.country)
            .param('region',filter.region)
            .param('color', filter.color)
            .param('sound', filter.sound)
            .param('genre', filter.genre.toString())
            .param('artMovement', filter.artMovement)
            .param('minRuntime', filter.minRuntime.toString(10))
            .param('maxRuntime', filter.maxRuntime.toString(10))
            .param('startYear', filter.startYear)
            .param('endYear', filter.endYear)
            .get(Uris.movie + Uris.filter);
    }

    getRelatedMoviesPage(): Observable<Page<MinimunMovie>> {
        return this.relatedMoviesPage$.asObservable();
    }

    setRelatedMovies(id: string, pageNumber, size) {
        this.httpService
            .param('page', pageNumber)
            .param('size', size)
            .get(`${Uris.movie}${Uris.related}/${id}`).subscribe(
                moviePage => {
                    this.relatedMoviesPage$.next(new MinimunMoviePage().deserialize(moviePage))
                }
            )
    }

    getSuggestionsByName(): Observable<string[]> {
        return this.movieNames$.asObservable();
    }

    setSuggestionsByName(name: string) {
        this.httpService.get(Uris.movie + Uris.suggestions + '/' + name).subscribe(
            MovieNameOrDirector => this.movieNames$.next(MovieNameOrDirector),
            error => this.movieNames$.next([])
        );
    }


}