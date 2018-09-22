import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartisanComponent } from './partisan.component';

describe('PartisanComponent', () => {
  let component: PartisanComponent;
  let fixture: ComponentFixture<PartisanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartisanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartisanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
