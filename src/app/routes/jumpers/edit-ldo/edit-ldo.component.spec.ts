import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLdoComponent } from './edit-ldo.component';

describe('EditLdoComponent', () => {
  let component: EditLdoComponent;
  let fixture: ComponentFixture<EditLdoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditLdoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLdoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
