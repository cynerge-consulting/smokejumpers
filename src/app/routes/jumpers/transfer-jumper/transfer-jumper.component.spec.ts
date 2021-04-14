import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferJumperComponent } from './transfer-jumper.component';

describe('TransferJumperComponent', () => {
  let component: TransferJumperComponent;
  let fixture: ComponentFixture<TransferJumperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferJumperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferJumperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
