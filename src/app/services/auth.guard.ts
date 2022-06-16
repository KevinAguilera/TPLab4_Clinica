import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authSvc: AuthService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkUser();
  }

  async checkUser(): Promise<boolean> {
    const user = this.authSvc.currentUser;
    if(user)
    {
      return true;
    }
    else
    {
      Swal.fire({
        title:'Error',
        text:'Inice sesión',
        icon:'error',
        cancelButtonText:'Cerrar',
      });
      return false;
    }

  }
}
