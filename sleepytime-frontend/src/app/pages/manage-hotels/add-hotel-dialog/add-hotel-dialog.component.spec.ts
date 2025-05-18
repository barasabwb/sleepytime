import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHotelDialogComponent } from './add-hotel-dialog.component';

describe('AddHotelDialogComponent', () => {
  let component: AddHotelDialogComponent;
  let fixture: ComponentFixture<AddHotelDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddHotelDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddHotelDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
