import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', loadChildren: './modules/main/main.module#MainModule'
  },
  {
    path:'movie/:id',loadChildren:'./modules/info-page/info-page.module#InfoPageModule'
  },
  {
    path: 'admin', loadChildren: './modules/admin/admin.module#AdminModule'
  },
  {
    path: '**', redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
