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
      // make a call to isRegistered
      axios
        .get(environment.API_URL + '/auth/isRegistered', {
          headers: { Authorization: 'Bearer ' + token }
        })
        .then((response) => {
          // if the user is registered, get the user info
          if (response.data) {
            axios
              .get(environment.API_URL + '/auth/userInfo', {
                headers: { Authorization: 'Bearer ' + token }
              })
              .then((userReponse) => {
                window.sessionStorage.setItem('userInfo', userReponse.data);
                return true;
              });

            // if the user is not registered do not allow access
            // and redirect to login / signup / register
          } else {
            window.location.href = '';
            return false;
          }
        });
    } else {
      // if there is no user info and no token to ask for that info,
      // do not allow access and redirect to login / signup / register
      window.location.href = '';
      return false;
    }
  }
}
