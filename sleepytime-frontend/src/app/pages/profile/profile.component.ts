import { Component, Inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatDatepickerModule,
    MatSnackBarModule,
    MatDividerModule,
    MatTabsModule,
    MatNativeDateModule
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  profileForm: FormGroup;
  isEditing = false;
  selectedTab = 0;
  user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, Anytown, USA',
    birthDate: new Date('1990-01-15'),
    avatar: 'assets/images/avatars/default.png',
    role: 'premium',
    memberSince: new Date('2022-06-15'),
    lastLogin: new Date('2023-06-20T14:30:00')
  };

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.profileForm = this.fb.group({
      name: [{ value: this.user.name, disabled: !this.isEditing }, Validators.required],
      email: [{ value: this.user.email, disabled: !this.isEditing }, [Validators.required, Validators.email]],
      phone: [{ value: this.user.phone, disabled: !this.isEditing }],
      address: [{ value: this.user.address, disabled: !this.isEditing }],
      birthDate: [{ value: this.user.birthDate, disabled: !this.isEditing }]
    });
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;

    if (this.isEditing) {
      this.profileForm.enable();
    } else {
      this.profileForm.disable();
      this.profileForm.patchValue({
        name: this.user.name,
        email: this.user.email,
        phone: this.user.phone,
        address: this.user.address,
        birthDate: this.user.birthDate
      });
    }
  }

  saveProfile(): void {
    if (this.profileForm.invalid) {
      this.snackBar.open('Please fill all required fields correctly', 'Close', { duration: 2000 });
      return;
    }

    this.user = {
      ...this.user,
      ...this.profileForm.getRawValue()
    };

    this.isEditing = false;
    this.profileForm.disable();
    this.snackBar.open('Profile updated successfully!', 'Close', { duration: 2000 });
  }

  changePassword(): void {
    this.snackBar.open('Password change functionality coming soon', 'Close', { duration: 2000 });
  }

  triggerFileInput(): void {
    this.document.getElementById('avatarUpload')?.click();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          this.user.avatar = e.target.result as string;
        }
      };
      reader.readAsDataURL(file);
    }
  }
}
