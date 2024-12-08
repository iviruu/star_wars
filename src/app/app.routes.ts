import { Routes } from '@angular/router';
import { LoginComponent } from './entities/components/login/login.component';
import { StarshipsComponent } from './pages/starships/starships.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './entities/components/register/register.component';
import { authGuard } from './shared/guard/auth.guard';

export const routes: Routes = [

    { path: 'starships', component: StarshipsComponent},
    { path: 'home', component: HomeComponent},
    { path: 'starships/:name', loadComponent:()=>import('./pages/body/body.component').then(m => m.BodyComponent), canActivate: [authGuard]  },
    { path: 'login', component: LoginComponent },
    {  path: 'register', component: RegisterComponent },
    { path: '**', redirectTo: 'home'},




];
