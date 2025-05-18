import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
 import { provideHttpClient , withFetch} from '@angular/common/http';
export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(withFetch()),provideZoneChangeDetection({ eventCoalescing: true }), provideNativeDateAdapter(), provideRouter(routes), provideClientHydration(withEventReplay())]
};
