import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieInfoPageComponent } from './pages';

const routes: Routes = [
  { path: ``, component: MovieInfoPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InfoRoutingModule { }
