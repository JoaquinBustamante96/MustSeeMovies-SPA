import { Injectable } from "@angular/core";
import { HttpService } from "@app/core/services/http.service";
import { Filter } from '../models/filter.model';
import { MinimumMovie } from '@app/core/models';
import { Page, Movie } from '@app/core/models';
import { Observable, Subject } from 'rxjs';
import { MinimumMoviePage } from '@app/core/models';
import { Uris } from '@app/core/uris-api';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/retryWhen';
import { AuthenticationService } from './authentication.service';

@Injectable({
    providedIn: 'root'
})

export class MovieService {

    private minimumMoviesPage$: Subject<Page<MinimumMovie>> = new Subject();
    private movie$: Subject<Movie> = new Subject();
    private relatedMoviesPage$: Subject<Page<MinimumMovie>> = new Subject();
    private movieNames$: Subject<string[]> = new Subject();

    constructor(private httpService: HttpService, private authService: AuthenticationService) { }

    getMoviesPage(): Observable<Page<MinimumMovie>> {
        return this.minimumMoviesPage$.asObservable();
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
        this.getFilteredMoviesPage(filter, pageNumber, size)
            .retryWhen((error) => {
                return error.scan(
                    (retryCount) => {
                        retryCount += 1;
                        if (retryCount < 3) {
                            return retryCount;
                        } else {
                            throw (error);
                        }
                    }, 0).delay(1000)
            })
            .subscribe(
                moviesPage => {
                    this.minimumMoviesPage$.next(new MinimumMoviePage().deserialize(moviesPage));
                }
            )
    }

    searchByName(name: string, pageNumber, size) {
        this.httpService
            .param("page", pageNumber)
            .param('size', size)
            .get(`${Uris.movie + Uris.filter + Uris.Name}/${name}`)
            .retryWhen((error) => {
                return error.scan(
                    (retryCount) => {
                        retryCount += 1;
                        if (retryCount < 3) {
                            return retryCount;
                        } else {
                            throw (error);
                        }
                    }, 0).delay(1000)
            })
            .subscribe(
                moviesPage => this.minimumMoviesPage$.next(new MinimumMoviePage().deserialize(moviesPage))
            )
    }

    searchMinimumPage(page, size, direction: string) {//direction = ASC or DESC
        this.httpService
            .param('page', page)
            .param('size', size)
            .param('dir', direction)
            .get(Uris.movie + Uris.page)
            .retryWhen((error) => {
                return error.scan(
                    (retryCount) => {
                        retryCount += 1;
                        if (retryCount < 3) {
                            return retryCount;
                        } else {
                            throw (error);
                        }
                    }, 0).delay(1000)
            })
            .subscribe(
                moviesPage => this.minimumMoviesPage$.next(new MinimumMoviePage().deserialize(moviesPage))
            )
    }

    setPageOfList(page, size, list) {
        this.httpService
            .param('page', page)
            .param('size', size)
            .param('list', list)
            .get(Uris.movie+Uris.list)
            .subscribe(
                moviesPage => this.minimumMoviesPage$.next(new MinimumMoviePage().deserialize(moviesPage))
            )
    }

    private getFilteredMoviesPage(filter: Filter, pageNumber, size): Observable<any> {
        return this.httpService
            .param('page', pageNumber)
            .param('size', size)
            .param('language', filter.language)
            .param('country', filter.country)
            .param('region', filter.region)
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

    getRelatedMoviesPage(): Observable<Page<MinimumMovie>> {
        return this.relatedMoviesPage$.asObservable();
    }

    setRelatedMovies(id: string, pageNumber, size) {
        this.httpService
            .param('page', pageNumber)
            .param('size', size)
            .get(`${Uris.movie}${Uris.related}/${id}`).subscribe(
                moviePage => {
                    this.relatedMoviesPage$.next(new MinimumMoviePage().deserialize(moviePage))
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