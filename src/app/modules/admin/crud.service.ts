import { Injectable } from "@angular/core";
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { MatSnackBar } from '@angular/material';
import { combineLatest } from 'rxjs';
import { first } from 'rxjs/operators';
import { HttpService } from "@app/core/services";
import { Movie } from "@app/core/models";
import { Uris } from '@app/core/uris-api';
import { MoviePage } from '@app/core/models/MoviePage.model';

@Injectable({
    providedIn: 'root'
})
export class CrudService {

    constructor(private httpService: HttpService, public snackBar: MatSnackBar) { }

    static SUGGESTIONS = '/suggestions';

    private movieNames$: Subject<string[]> = new Subject();
    private moviePage$: Subject<MoviePage> = new Subject();
    private isCreated$: Subject<boolean> = new Subject();

    getPage(page: string, size: string, key: string, dir: string) {
        this.getpage(page, size, key, dir).subscribe(
            page => {
                this.moviePage$.next(new MoviePage().deserialize(page))
            }
        )
        return this.moviePage$.asObservable();
    }

    private getpage(page: string, size: string, key: string, dir: string): Observable<Movie[]> {
        return this.httpService.param("size", size).param("page", page).param("key", key).param("dir", dir).get(Uris.movie);
    }

    getPageByName(movieName: string): Observable<Movie[]> {
        return this.httpService.get(Uris.movie + Uris.Name + '/' + movieName);
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

    createMovie(movie: Movie, file: File): Observable<any> {

        combineLatest(this.uploadposter(file), this.uploadMovieData(movie))
            .pipe(first())
            .subscribe(
                ([poster, movie]) => {
                    const posterID = poster.id;
                    const movieID = movie.id;
                    this.updateMoviePoster(movieID, posterID).subscribe(
                        () => this.isCreated$.next(true),
                        error => this.isCreated$.next(false)
                    )
                },
                error => this.isCreated$.next(false)
            );

        return this.isCreated$.asObservable();
    }

    private updateMoviePoster(movieID: string, posterID: string): Observable<any> {
        return this.httpService.param('id', movieID).param('poster', posterID).put(Uris.movie + Uris.poster);
    }

    private uploadposter(file: File): Observable<any> {
        const formdata = new FormData();
        formdata.append('file', file);
        return this.httpService.post(Uris.file, formdata);
    }

    private uploadMovieData(movie: Movie): Observable<any> {
        return this.httpService.post(Uris.movie, movie);
    }

    updateMovieData(id: string, movie: Movie): Observable<any> {
        return this.httpService.param('id', id).put(Uris.movie, movie);
    }

    updatePoster(id: string, file: File): Observable<any> {
        const formdata = new FormData();
        formdata.append('file', file);
        return this.httpService.param('id', id).put(Uris.file, formdata);
    }

    deleteMovie(id: String): Observable<any> {
        return this.httpService.delete(Uris.movie + '/' + id);
    }

}