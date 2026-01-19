import { Routes } from '@angular/router';
import { Register } from './auth/components/register/register';
import { Login } from './auth/components/login/login';
import { NotFoundError } from 'rxjs';
import { NotFound } from './other/components/not-found/not-found';
import { Addgift } from './gifts/components/addgift/addgift';
import { ManagementWrapper } from '../management-wrapper/management-wrapper';
import { Component } from '@angular/core';
import { Managegift} from './gifts/components/manage-gifts/manage-gifts';
import { ManageDonor } from './doner/components/manage-donor/manage-donor';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'register', component: Register },
    {path: 'login', component: Login},
    {path: 'management' ,component:ManagementWrapper,
        children:[
            { path: 'gift', component: Managegift },
            { path:'donor',component:ManageDonor}
        ]},
    {path: '**', component : NotFound} 

];

