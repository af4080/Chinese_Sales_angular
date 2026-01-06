import { Routes } from '@angular/router';
import { Register } from './auth/components/register/register';
import { Login } from './auth/components/login/login';
import { NotFoundError } from 'rxjs';
import { NotFound } from './other/components/not-found/not-found';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'register', component: Register },
    {path: 'login', component: Login},
    {path: '**', component : NotFound} 

];

