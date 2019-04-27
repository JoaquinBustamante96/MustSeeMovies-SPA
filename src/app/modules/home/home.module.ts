import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '@app/shared/shared.module';

import { HomePageComponent } from './pages/index';

import {
  MoviePreviewComponent,
  MoviePreviewMobileComponent,
  MainHeaderComponent,
} from './components/index';
import { ScrollPositionerService } from './services/scroll-position.service';

@NgModule({
  declarations: [
    HomePageComponent,
    MoviePreviewComponent,
    MoviePreviewMobileComponent,
    MainHeaderComponent,
  ],
  imports: [
    SharedModule,
    HomeRoutingModule,
  ]
})
export class HomeModule {
  constructor(private scrollPositionerService: ScrollPositionerService) { }
}
