import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, Routes} from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { TaskListComponent } from './tasks/task-list/task-list.component';
import { TaskFormComponent } from './tasks/task-form/task-form.component';

import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import path from 'path';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';




const routes : Routes = [
  { path: '', redirectTo: 'tasks', pathMatch: 'full' },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  { path: 'tasks', component: TaskListComponent },
  { path: 'tasks/new', component: TaskFormComponent } 
]








export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(withEventReplay()), provideAnimationsAsync()]
};
