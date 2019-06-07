import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowHidePasswordIconComponent } from './show-hide-password-icon.component';

describe('ShowHidePasswordIconComponent', () => {
  let component: ShowHidePasswordIconComponent;
  let fixture: ComponentFixture<ShowHidePasswordIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowHidePasswordIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowHidePasswordIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
