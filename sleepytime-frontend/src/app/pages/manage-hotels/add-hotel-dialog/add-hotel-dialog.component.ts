import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-add-hotel-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './add-hotel-dialog.component.html'
})
export class AddHotelDialogComponent {
  hotelForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddHotelDialogComponent>
  ) {
    this.hotelForm = this.fb.group({
      name: ['Test Hotel', Validators.required],
      location: ['Test City', Validators.required],
      description: ['A nice hotel'],
      photos: this.fb.array([
        this.fb.control('https://example.com/photo.jpg', Validators.required)
      ]),
      services: this.fb.array([]),  // services with required validator on 'name'
      rooms: this.fb.array([]),
    });

    this.addRoom();
    this.addAvailableDate(0); // Add default available date for room 0

    const firstRoom = this.rooms.at(0);
    firstRoom.patchValue({
      roomType: 'Single',
      pricePerNight: 100,
      maxGuests: 1,
    });

    this.getAvailableDates(0).at(0).patchValue({
      from: '2025-06-01',
      to: '2025-06-05',
    });

    // Add custom validator to each availableDates group inside rooms
    this.rooms.controls.forEach(roomGroup => {
      const availableDates = roomGroup.get('availableDates') as FormArray;
      availableDates.controls.forEach(dateGroup => {
        dateGroup.setValidators(this.dateRangeValidator());
      });
    });
  }

  // Custom validator: "to" date must be after "from" date
  dateRangeValidator(): ValidatorFn {
    return (group: AbstractControl) => {
      const from = group.get('from')?.value;
      const to = group.get('to')?.value;
      if (!from || !to) return null;
      return new Date(to) >= new Date(from) ? null : { invalidDateRange: true };
    };
  }

  get photos(): FormArray {
    return this.hotelForm.get('photos') as FormArray;
  }

  get services(): FormArray {
    return this.hotelForm.get('services') as FormArray;
  }

  get rooms(): FormArray {
    return this.hotelForm.get('rooms') as FormArray;
  }

  addPhoto() {
    this.photos.push(this.fb.control('', Validators.required));
  }

  removePhoto(index: number) {
    this.photos.removeAt(index);
  }

  addService() {
    const serviceGroup = this.fb.group({
      name: ['', Validators.required], // required validator
      description: ['']
    });
    this.services.push(serviceGroup);
  }

  removeService(index: number) {
    this.services.removeAt(index);
  }

  addRoom() {
    const roomGroup = this.fb.group({
      roomType: ['', Validators.required],
      pricePerNight: ['', [Validators.required, Validators.min(0)]],
      maxGuests: ['', [Validators.required, Validators.min(1)]],
      availableDates: this.fb.array([])
    });
    this.rooms.push(roomGroup);
  }

  removeRoom(index: number) {
    this.rooms.removeAt(index);
  }

  getAvailableDates(roomIndex: number): FormArray {
    return this.rooms.at(roomIndex).get('availableDates') as FormArray;
  }

  addAvailableDate(roomIndex: number) {
    const dateGroup = this.fb.group({
      from: ['', Validators.required],
      to: ['', Validators.required]
    }, { validators: this.dateRangeValidator() });

    this.getAvailableDates(roomIndex).push(dateGroup);
  }

  removeAvailableDate(roomIndex: number, dateIndex: number) {
    this.getAvailableDates(roomIndex).removeAt(dateIndex);
  }

  onSubmit() {
  this.hotelForm.markAllAsTouched();
  this.hotelForm.updateValueAndValidity();

  // Log validity for debugging
  console.log('Form valid?', this.hotelForm.valid);
  console.log('Form errors:', this.hotelForm.errors);
  console.log('Services valid?', this.services.valid);
  this.services.controls.forEach((ctrl, idx) => {
    console.log(`Service[${idx}] valid?`, ctrl.valid, ctrl.value);
  });

  if (this.hotelForm.valid) {
    this.dialogRef.close(this.hotelForm.value);
  }
}

  onCancel() {
    this.dialogRef.close(null);
  }
}
