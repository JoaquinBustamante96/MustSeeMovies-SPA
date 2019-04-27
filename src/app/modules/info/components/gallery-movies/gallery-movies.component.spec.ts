import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryMoviesComponent } from './gallery-movies.component';

describe('GalleryMoviesComponent', () => {
  let component: GalleryMoviesComponent;
  let fixture: ComponentFixture<GalleryMoviesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GalleryMoviesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
