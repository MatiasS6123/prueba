import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProtegeVistaGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.authService.getUserAuthState().pipe(
        take(1),
        map(user => {
          if (user) {
            return true;  // El usuario está logeado y puede acceder a la ruta
          } else {
            this.router.navigate(['/login']);  // Redirigir al inicio de sesión
            return false;  // El acceso a la ruta está restringido
          }
        })
      );
  }
}
