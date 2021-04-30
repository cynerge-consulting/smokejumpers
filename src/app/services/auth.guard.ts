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
              .then((userResponse) => {
                let userInfo = userResponse.data;
                axios.get(
                  environment.API_URL + '/base/dropdown/main',
                  {
                    headers: { Authorization: 'Bearer ' + token }
                  }
                ).then((response) => {
                  let bases = response.data.filter(
                    (base) => base.baseId.toString() === userInfo.baseId.toString()
                  );
                  let userBase = bases[0]
                  userInfo.basecode = userBase.baseCode
                  userInfo.baseCode = userBase.baseCode
                  window.sessionStorage.setItem(
                    'userInfo',
                    JSON.stringify(userInfo)
                  );
                  if (!userInfo.status) {
                    // if the user role is 'unregistered' redirect to /register
                    if (userInfo.role === 'unregistered') {
                      window.location.href = environment.HOME_URL + 'register';
                    } else {
                      window.location.href = environment.HOME_URL + 'welcome';
                    }
                  }

                  window.location.href = environment.HOME_URL + 'dashboard';
                  return true;
                })

              })
              .catch((error) => {
                console.log('error getting user info');
                console.dir(error);
              });
          } else {
            // if the user is not registered redirect to /register
            window.location.href = environment.HOME_URL + 'register';
            return false;
          }
        })
        .catch((error) => {
          console.log('error getting registration info for user');
          console.dir(error);
          window.location.href = environment.LOGIN_PORTAL;
        });
    } else {
      // if there is no token redirect to login
      window.location.href = environment.LOGIN_PORTAL;
      return false;
    }
  }
}
