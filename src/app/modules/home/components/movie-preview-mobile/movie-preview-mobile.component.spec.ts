import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviePreviewMobileComponent } from './movie-preview-mobile.component';

describe('MoviePreviewMobileComponent', () => {
  let component: MoviePreviewMobileComponent;
  let fixture: ComponentFixture<MoviePreviewMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoviePreviewMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviePreviewMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
