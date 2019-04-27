import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';

import {
  ReadComponent, SearchBoxComponentAdmin,
  CreateComponent, GenreFieldComponent,
  FieldChipsComponent,
} from './components';
import { CrudComponent, loginComponent } from './pages';

import { AdminRoutingModule } from './admin-routing.module';
import { WarningDialogComponent } from './components/warning-dialog/warning-dialog.component';

@NgModule({
  declarations: [
    FieldChipsComponent,
    GenreFieldComponent,
    CreateComponent,
    SearchBoxComponentAdmin,
    ReadComponent,
    CrudComponent,
    loginComponent,
    WarningDialogComponent,
  ],
  imports: [
    AdminRoutingModule,
    SharedModule,
  ],
  entryComponents: [
    WarningDialogComponent
  ]
})
export class AdminModule { }
