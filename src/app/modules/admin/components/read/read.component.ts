import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CrudService } from '@app/modules/admin/crud.service';
import { Movie } from '@app/core/models';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { MatSnackBar, MatDialog } from '@angular/material';
import { WarningDialogComponent } from '../warning-dialog/warning-dialog.component';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {

  @Output() editMovie = new EventEmitter<any>();

  totalMovies$ = new BehaviorSubject<number>(0);
  dataOnPage$ = new BehaviorSubject<Movie[]>([]);

  currentPage$ = new BehaviorSubject<any>(0);
  pageSize$ = new BehaviorSubject<any>(25);
  sortKey$ = new BehaviorSubject<string>('name');
  sortDirection$ = new BehaviorSubject<string>('desc');

  displayedColumns = ['name', 'director', 'genre', 'storyline', 'artMovement',
    'country','region', 'language', 'releaseDate', 'runtime', 'color', 'sound', 'actions'];

  columns = ['name', 'director', 'genre', 'storyline', 'artMovement',
    'country','region', 'language', 'releaseDate', 'runtime', 'color', 'sound'];

  constructor(private crudService: CrudService, public snackBar: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit() {
    combineLatest(this.currentPage$, this.pageSize$, this.sortKey$, this.sortDirection$)
      .subscribe(([currentPage, pageSize, sortKey, sortDirection]) => {

        this.crudService.getPage(currentPage, pageSize, sortKey, sortDirection).subscribe(
          page => {
            this.totalMovies$.next(page.totalElements);
            this.dataOnPage$.next(page.content)
          })
      })
  }

  sortData(active, direction) {
    if (direction != this.sortDirection$ && direction != '') {
      this.sortDirection$.next(direction);
    }
    else {
      this.sortKey$.next(active);
    }
  }

  pageEvent(indx, pageSize) {
    if (indx != this.currentPage$.value) {
      this.currentPage$.next(indx);
    }
    else {
      this.pageSize$.next(pageSize);
    }
  }

  openDialog(name: string, id: string) {
    console.log(name)
    const dialogRef = this.dialog.open(WarningDialogComponent, {
      width: '250px',
      data: { name: name, id: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.crudService.deleteMovie(result).subscribe(
          () => {
            this.openSnackBar('Deleted');
            this.reload();
          },
          error => this.openSnackBar('Error deleting movie try again ')
        )
      }
    });
  }

  edit(row: Movie) {
    this.editMovie.emit(row);
  }

  onSearch(value: string) {
    this.crudService.getPageByName(value).subscribe(
      movies => this.dataOnPage$.next(movies)
    );
  }

  reload() {
    this.pageSize$.next(this.pageSize$.value);
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'cerrar', {
      duration: 3000,
    });
  }

}
