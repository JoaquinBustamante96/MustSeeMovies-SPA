import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageMovieComponent } from './image-movie.component';

describe('ImageMovieComponent', () => {
  let component: ImageMovieComponent;
  let fixture: ComponentFixture<ImageMovieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageMovieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
