import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieInfoMobileComponent } from './movie-info-mobile.component';

describe('MovieInfoMobileComponent', () => {
  let component: MovieInfoMobileComponent;
  let fixture: ComponentFixture<MovieInfoMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieInfoMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieInfoMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
