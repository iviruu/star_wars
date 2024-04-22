import { Routes } from '@angular/router';

export const routes: Routes = [

    {
        path: 'starships', loadComponent:()=>import('./pages/starships/starships.component').then(m => m.StarshipsComponent)
    },
    {
        path: 'home', loadComponent:()=>import('./pages/home/home.component').then(m => m.HomeComponent)
    },
    {
        path: 'starships/:name', loadComponent:()=>import('./pages/body/body.component').then(m => m.BodyComponent)     
    },
    {
        path: '**', redirectTo: 'home'
    },



];
