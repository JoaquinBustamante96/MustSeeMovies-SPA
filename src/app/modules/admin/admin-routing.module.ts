import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrudComponent, loginComponent } from './pages';
import { AuthGuard } from '@app/core/guards';


const routes: Routes = [
  {
    path: '', component: CrudComponent, canActivate: [AuthGuard]
  },
  {
    path: 'login', component: loginComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
