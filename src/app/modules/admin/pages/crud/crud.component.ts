import { Component, OnInit } from '@angular/core';
import { Animations } from '@app/shared/animations';
import { Movie, MinimunMovie } from '@app/core/models';
import { AuthenticationService } from '@app/core/services';
import { CrudService } from '../../crud.service';
import { first } from 'rxjs/operators';
import { snackbar } from '@app/core/services/snackbar.service';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css'],
  animations: [Animations.fadeIn,]
})
export class CrudComponent implements OnInit {

  value = "read";
  movie: Movie;
  constructor(
    private authenticationService: AuthenticationService,
    private crudService: CrudService,
    private snackbarService: snackbar
  ) { }

  ngOnInit() {
  }

  logout() {
    this.authenticationService.logout();
  }

  onCreateMovie(data: { movie: Movie, poster: File }) {
    this.crudService.createMovie(data.movie, data.poster)
      .pipe(first())
      .subscribe(
        (isCreated) => {
          if (isCreated) {
            this.snackbarService.movieCreated();
          } else {
            this.snackbarService.errorCreatingOrUpdating()
          }
        }
      );
  }

  onUpdateMovie(data: { movie: Movie, poster: File }) {
    this.crudService.updateMovieData(this.movie.id, data.movie).pipe(first()).subscribe(
      () => {
        this.snackbarService.movieUpdated();
      },
      error => this.snackbarService.errorCreatingOrUpdating()
    );
    if (data.poster) {
      this.crudService.updatePoster(this.movie.poster, data.poster).pipe(first()).subscribe(
        error => this.snackbarService.errorUpdatingPoster()
      )
    }
    this.movie = null;
  }

  onEditMovie(movie: Movie) {
    this.movie = movie;
    this.value = "create";
  }

  isPressed(value: string): boolean {
    return this.value == value;
  }

  onClick(value: string) {
    if (value == 'read' && this.movie != null) {
      this.movie = null;
    }
    this.value = value;
  }

}
