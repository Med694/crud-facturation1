import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withHashLocation } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { App } from './app/app';
import { LoginComponent } from './app/components/login.component';
import { RegisterComponent } from './app/components/register.component';
import { AdminComponent } from './app/components/admin/admin.component'

bootstrapApplication(App, {
  providers: [
    provideRouter([
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'admin', component: AdminComponent },
      { path: '**', redirectTo: 'login' }
    ], withHashLocation()),
    provideHttpClient()
  ]
}).catch(err => console.error(err));