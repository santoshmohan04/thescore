import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { EmployeeStore } from './store/employees.store';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    provideHttpClient(),
    provideAnimationsAsync(),
    importProvidersFrom(EmployeeStore)
  ],
};
