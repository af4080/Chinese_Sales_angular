import { Routes } from '@angular/router';
import { Register } from './auth/components/register/register';
import { Login } from './auth/components/login/login';
import { NotFoundError } from 'rxjs';
import { NotFound } from './other/components/not-found/not-found';
import { ManagementWrapper } from '../management-wrapper/management-wrapper';
import { Component } from '@angular/core';
import { Managegift } from './gifts/components/manage-gifts/manage-gifts';
import { ManageDonor } from './doner/components/manage-donor/manage-donor';
import { SingleGift } from './gifts/components/single-gift/single-gift';
import { AllGifts } from './gifts/components/all-gifts/all-gifts';
import { Success } from './basket/components/success/success';
import { ManagePurchase } from './purchase/components/manage-purchase/manage-purchase';
import { Lottery } from './lottery/components/lottery/lottery';
import { Home } from './other/components/home/home';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {path: 'home', component: Home },
    { path: 'register', component: Register },
    { path: 'login', component: Login },
    { path: 'gifts', component: AllGifts },
    { path: "gifts/:name", component: SingleGift },
    { path: 'purchase-success', component: Success },

    {
        path: 'management', component: ManagementWrapper,
        children: [
            { path: 'gift', component: Managegift },
            { path: 'donor', component: ManageDonor },
            { path: 'purchase', component: ManagePurchase },
            { path: 'lottery', component: Lottery }
        ]
    },
    { path: '**', component: NotFound }

];

