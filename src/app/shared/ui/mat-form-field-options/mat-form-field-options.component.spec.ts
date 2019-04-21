import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatFormFieldOptionsComponent } from './mat-form-field-options.component';

describe('MatFormFieldOptionsComponent', () => {
  let component: MatFormFieldOptionsComponent;
  let fixture: ComponentFixture<MatFormFieldOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatFormFieldOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatFormFieldOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
