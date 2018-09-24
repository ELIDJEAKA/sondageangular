import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulateurComponent } from './simulateur.component';

describe('SimulateurComponent', () => {
  let component: SimulateurComponent;
  let fixture: ComponentFixture<SimulateurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimulateurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimulateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
