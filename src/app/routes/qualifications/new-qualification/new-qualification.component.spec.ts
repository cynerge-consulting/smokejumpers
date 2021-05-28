import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewQualificationComponent } from './new-qualification.component';

describe('NewQualificationComponent', () => {
  let component: NewQualificationComponent;
  let fixture: ComponentFixture<NewQualificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewQualificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewQualificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
