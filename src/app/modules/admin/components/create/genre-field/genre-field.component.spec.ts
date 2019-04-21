import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenreFieldComponent } from './genre-field.component';

describe('GenreFieldComponent', () => {
  let component: GenreFieldComponent;
  let fixture: ComponentFixture<GenreFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenreFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenreFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
