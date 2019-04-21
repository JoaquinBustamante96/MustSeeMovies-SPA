import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { MovieInfoPageComponent } from './pages/movie-info-page/movie-info-page.component';
import { UrisModules } from '@app/core/routed-modules-uris';

const routes: Routes = [
  { path:  '' , component: MainPageComponent },
  { path: 'byFilter', component: MainPageComponent},
  { path: 'byName', component: MainPageComponent},
  { path: `movies${UrisModules.id}`, component: MovieInfoPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
