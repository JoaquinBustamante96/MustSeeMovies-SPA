import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectYearsComponent } from './select-years.component';

describe('SelectYearsComponent', () => {
  let component: SelectYearsComponent;
  let fixture: ComponentFixture<SelectYearsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectYearsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectYearsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
