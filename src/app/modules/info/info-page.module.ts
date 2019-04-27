import { NgModule } from '@angular/core';

import { GalleryMoviesComponent, MovieInfoComponent, MovieInfoMobileComponent } from './components';
import { MovieInfoPageComponent } from './pages/index';
import { SharedModule } from '@app/shared/shared.module';
import { InfoRoutingModule } from './info-routing.module';


@NgModule({
  declarations: [
    GalleryMoviesComponent,
    MovieInfoComponent,
    MovieInfoMobileComponent,
    MovieInfoPageComponent,
  ],
  imports: [
    SharedModule,
    InfoRoutingModule
  ]
})
export class InfoPageModule { }
