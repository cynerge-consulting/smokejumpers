import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import axios from 'axios';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let token;
    let userInfo;

    // check session storage for a logged in user
    if (window.sessionStorage.getItem('userInfo')) {
      return true;
    }

    // check session storage for a token
    if (window.sessionStorage.getItem('token')) {
      token = window.sessionStorage.getItem('token');
    }
    // check query params for a token
    // set / refresh the token value in session storage
    if (route.queryParams.t) {
      token = route.queryParams.t;
      window.sessionStorage.setItem('token', token);
    }

    if (token) {
      axios
        .get(environment.AUTH_URL + '/isRegistered', {
          headers: { Authorization: 'Bearer ' + token }
        })
        .then((response) => {
          // if the user is registered
          if (response.data) {
            axios
              .get(environment.AUTH_URL + '/userInfo', {
                headers: { Authorization: 'Bearer ' + token }
              })
              .then((userReponse) => {
                window.sessionStorage.setItem(
                  'userInfo',
                  JSON.stringify(userReponse.data)
                );
                window.location.href = window.location.origin;
                return true;
              });
          } else {
            // if the user is not registered redirect to welcome
            window.location.href = window.location.origin + '/welcome';
            return false;
          }
        });
    } else {
      // if there is no token redirect to login
      window.location.href = environment.LOGIN_PORTAL;
      return false;
    }
  }
}
