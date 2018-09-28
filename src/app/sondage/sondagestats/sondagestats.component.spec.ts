import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SondagestatsComponent } from './sondagestats.component';

describe('SondagestatsComponent', () => {
  let component: SondagestatsComponent;
  let fixture: ComponentFixture<SondagestatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SondagestatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SondagestatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
