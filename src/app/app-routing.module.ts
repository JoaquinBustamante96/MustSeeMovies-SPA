import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
  },
  {
    path:'movie/:id',loadChildren:() => import('./modules/info/info-page.module').then(m => m.InfoPageModule)
  },
  {
    path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)
  },{
    path:'forgot-password/:token', loadChildren: () => import('./modules/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule)
  }
  ,
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
