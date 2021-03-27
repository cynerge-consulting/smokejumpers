import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewChuteComponent } from './new-chute.component';

describe('NewChuteComponent', () => {
  let component: NewChuteComponent;
  let fixture: ComponentFixture<NewChuteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewChuteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewChuteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
