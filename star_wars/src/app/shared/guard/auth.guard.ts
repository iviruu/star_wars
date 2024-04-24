import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if(authService.isAuthenticated()){
    return true
  }else{
    authService.redirectUrl = state.url;
    router.navigateByUrl('/login'); 
    return false;
  }
};
