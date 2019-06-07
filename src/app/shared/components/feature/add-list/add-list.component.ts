import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Observable, Subscription, Subject } from 'rxjs';
import { MovieListsService } from '@app/core/services/movieLists.service';
import { HandleMoviesService, AuthenticationService } from '@app/core/services';

@Component({
  selector: 'app-add-list',
  templateUrl: './add-list.component.html',
  styleUrls: ['./add-list.component.css']
})
export class AddListComponent implements OnInit {

  @Input() id: string;

  options: string[];
  showOptions = false;
  later: boolean;
  watched: boolean;
  showSignInDialog$ = new Subject<any>();

  constructor(
    private movieListsSerivce: MovieListsService,
    private handleMoviesService: HandleMoviesService,
    private authService: AuthenticationService) { }

  ngOnInit() {
    this.options = ['Watch later', 'Watched'];
  }

  openHideList() {
    if (!this.authService.hasSignIn()) {
      this.openSignInDialog();
    } else {
      if (!this.showOptions && this.authService.hasSignIn) {
        this.movieListsSerivce.isMovieInList(this.id).subscribe(
          response => {
            this.later = response['Watch later'];
            this.watched = response['Watched'];
            this.showOptions = true;
          }
        )
      }else{
        this.showOptions = false;
      }
    }

  }

  addOrRemoveFromList(listName: string, addOrRemove: boolean) { //true add | false remove
    if (addOrRemove) {
      this.handleMoviesService.addMovieToList(listName, this.id);
    } else {
      this.handleMoviesService.removeMovieFromList(listName, this.id);
    }

  }

  OnCheckboxChange(name: string) {
    if (name == 'Watch later') {
      this.later = !this.later;
      this.addOrRemoveFromList(name, this.later);
    } else {
      this.watched = !this.watched;
      this.addOrRemoveFromList(name, this.watched);
    }
  }

  openSignInDialog() {
    this.showSignInDialog$.next();
  }

}
