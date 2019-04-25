import { NgModule } from '@angular/core';
import { MainRoutingModule } from './main-routing.module';
import { SharedModule } from '@app/shared/shared.module';

import { MainPageComponent } from './pages/index';

import {
  MoviePreviewComponent,
  MoviePreviewMobileComponent,
  MainHeaderComponent,
} from './components/index';
import { ScrollPositionerService } from './services/scroll-position.service';

@NgModule({
  declarations: [
    MainPageComponent,
    MoviePreviewComponent,
    MoviePreviewMobileComponent,
    MainHeaderComponent,
  ],
  imports: [
    SharedModule,
    MainRoutingModule,
  ]
})
export class MainModule {
  constructor(private scrollPositionerService: ScrollPositionerService) { }
}
