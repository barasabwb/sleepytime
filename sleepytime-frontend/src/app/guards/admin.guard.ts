import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = () => {
  const router = inject(Router);

  // Check if running in the browser
  const isBrowser = typeof window !== 'undefined' && !!window.localStorage;
  let user: any = null;

  if (isBrowser) {
    try {
      user = JSON.parse(localStorage.getItem('user') || 'null');
    } catch (e) {
      user = null;
    }
  }

  if (user?.user.role === 'admin') {
    return true;
  } else {
    router.navigate(['/']);
    return false;
  }
};
