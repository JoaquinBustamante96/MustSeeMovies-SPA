import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './pages/home/home.component';

const routes: Routes = [
  { path:  '' , component: HomePageComponent },
  { path: 'byFilter', component: HomePageComponent},
  { path: 'byName', component: HomePageComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
