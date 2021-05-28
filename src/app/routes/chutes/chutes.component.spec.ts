import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChutesComponent } from './chutes.component';

describe('ChutesComponent', () => {
  let component: ChutesComponent;
  let fixture: ComponentFixture<ChutesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChutesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
