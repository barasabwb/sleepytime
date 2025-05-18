import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const isBrowser = typeof window !== 'undefined' && !!window.localStorage;
  let token: string | null = null;

  if (isBrowser) {
    token = localStorage.getItem('token');
  }

  if (token) {
    return true;
  } else {
    router.navigate(['/']); // Or to your login page
    return false;
  }
};
