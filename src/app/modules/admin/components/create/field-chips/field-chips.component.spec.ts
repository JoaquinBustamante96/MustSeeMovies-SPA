import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldChipsComponent } from './field-chips.component';

describe('FieldChipsComponent', () => {
  let component: FieldChipsComponent;
  let fixture: ComponentFixture<FieldChipsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldChipsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldChipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
