import { Routes } from '@angular/router';
import { Register } from './auth/components/register/register';
import { Login } from './auth/components/login/login';
import { NotFoundError } from 'rxjs';
import { NotFound } from './other/components/not-found/not-found';
import { Addgift } from './gifts/components/addgift/addgift';
import { ManagementWrapper } from '../management-wrapper/management-wrapper';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'register', component: Register },
    {path: 'login', component: Login},
    {path: 'management' ,component:ManagementWrapper,
        children:[
            { path: 'addGift', component: Addgift }
        ]},
    {path: '**', component : NotFound} 

];

