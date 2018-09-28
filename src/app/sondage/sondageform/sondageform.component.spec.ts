import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SondageformComponent } from './sondageform.component';

describe('SondageformComponent', () => {
  let component: SondageformComponent;
  let fixture: ComponentFixture<SondageformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SondageformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SondageformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
