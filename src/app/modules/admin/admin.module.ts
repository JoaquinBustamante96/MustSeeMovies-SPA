import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';

import {
  ReadComponent, SearchBoxComponent,
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
    SearchBoxComponent,
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
