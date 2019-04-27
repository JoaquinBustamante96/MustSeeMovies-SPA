import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectRuntimeComponent } from './select-runtime.component';

describe('SelectRuntimeComponent', () => {
  let component: SelectRuntimeComponent;
  let fixture: ComponentFixture<SelectRuntimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectRuntimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectRuntimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
