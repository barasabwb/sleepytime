import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-auth-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.css']
})
export class AuthModalComponent {
  isOpen = signal(false);
  activeTab = signal<'login' | 'register'>('login');
  isLoading = signal(false);
  errorMessage = signal('');

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  registerForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', Validators.required)
  });

  constructor(private authService: AuthService) {}

  openModal(tab: 'login' | 'register' = 'login') {
    this.activeTab.set(tab);
    this.isOpen.set(true);
    this.errorMessage.set('');
    this.loginForm.reset();
    this.registerForm.reset();
  }

  closeModal() {
    this.isOpen.set(false);
  }

  onLogin() {
    if (this.loginForm.invalid) return;

    this.isLoading.set(true);
    const { email, password } = this.loginForm.value;

    this.authService.login(email!, password!).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.closeModal();
      },
      error: (err) => {
        this.errorMessage.set(err.error?.message || 'Login failed');
        this.isLoading.set(false);
      }
    });
  }

  onRegister() {
    if (this.registerForm.invalid) return;

    const { name, email, password, confirmPassword } = this.registerForm.value;
    if (password !== confirmPassword) {
      this.errorMessage.set('Passwords do not match');
      return;
    }

    this.isLoading.set(true);

    this.authService.register(name!, email!, password!).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.closeModal();
      },
      error: (err) => {
        this.errorMessage.set(err.error?.message || 'Registration failed');
        this.isLoading.set(false);
      }
    });
  }
}
