import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JumpersComponent } from './jumpers.component';

describe('JumpersComponent', () => {
  let component: JumpersComponent;
  let fixture: ComponentFixture<JumpersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JumpersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JumpersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
