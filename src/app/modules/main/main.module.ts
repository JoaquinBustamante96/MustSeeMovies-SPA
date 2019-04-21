import { NgModule } from '@angular/core';
import { MainRoutingModule } from './main-routing.module';
import { SharedModule } from '@app/shared/shared.module';

import { MainPageComponent, MovieInfoPageComponent } from './pages/index';

import {
  MovieInfoComponent, GalleryMoviesComponent,
  MovieInfoMobileComponent, MoviePreviewComponent,
  MoviePreviewMobileComponent, MainHeaderComponent,
  SearchBoxComponent, FilterComponent, SelectRuntimeComponent,
  SelectYearsComponent, ImageMovieComponent
} from './components/index';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ScrollPositionerService } from './services/scroll-position.service';
import { ShareMovieButtonsComponent } from './components/share-movie-buttons/share-movie-buttons.component';

@NgModule({
  declarations: [
    MainPageComponent,
    FilterComponent,
    SelectRuntimeComponent,
    SelectYearsComponent,
    MovieInfoPageComponent,
    MovieInfoComponent,
    GalleryMoviesComponent,
    MovieInfoMobileComponent,
    MoviePreviewComponent,
    MoviePreviewMobileComponent,
    MainHeaderComponent,
    SearchBoxComponent,
    ImageMovieComponent,
    ToolbarComponent,
    ShareMovieButtonsComponent,
  ],
  imports: [
    SharedModule,
    MainRoutingModule,
  ]
})
export class MainModule {
  constructor(private scrollPositionerService: ScrollPositionerService){}
}
