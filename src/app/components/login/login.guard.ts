import {  CanActivate,  ActivatedRouteSnapshot,  RouterStateSnapshot,  Router} from "@angular/router";
import { Injectable } from "@angular/core";
import { AuthService } from "src/app/shared/services/auth.service";


@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private authservice: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    let logged = this.authservice.isLoggedIn();

    if (logged) {
     
      return true;

    }else{
        alert("Sayfayı görüntülemek için lütfen giriş yapın");
        this.router.navigate(['/login']);
        return false;
       
    }
    
  }
}