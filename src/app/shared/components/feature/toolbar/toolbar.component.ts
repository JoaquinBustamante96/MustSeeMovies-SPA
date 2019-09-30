import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Filter } from '@app/shared/models';
import { HandleMoviesService } from '@app/core/services';
import { Router } from '@angular/router';
import { Animations } from '@app/shared/animations';
import { UrisModules } from '@app/core/routed-modules-uris';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
  animations: [
    Animations.slideInOut,
  ],
})
export class ToolbarComponent implements OnInit {

  @Output() onRedirect = new EventEmitter();
  showFilter: boolean;

  constructor(private handleMovieService: HandleMoviesService, private router: Router) { }

  ngOnInit() { }

  showHideFilter() {
    this.showFilter = !this.showFilter;
  }

  searchByFilter(filter: Filter) {
    this.handleMovieService.searchByFilter(filter);
    this.router.navigate([UrisModules.byFilter]);
    this.OnSearch()
  }

  searchByName(name: string) {
    this.handleMovieService.searchByName(name);
    this.router.navigate([UrisModules.byName]);
    this.OnSearch();
  }

  private OnSearch() {
    this.showFilter = false;
  }

  redirectToHome(type: string) {
    this.onRedirect.emit();
    this.router.navigate([type]);
  }

}
