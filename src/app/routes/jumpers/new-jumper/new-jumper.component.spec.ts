import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewJumperComponent } from './new-jumper.component';

describe('NewJumperComponent', () => {
  let component: NewJumperComponent;
  let fixture: ComponentFixture<NewJumperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewJumperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewJumperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
