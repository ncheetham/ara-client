import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, Observable, take } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { jwtDecode } from 'jwt-decode' ; 
import { User } from 'src/app/user/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    //console.log("in Interceptor") ;

    if ('token' in localStorage) {

      const token = localStorage.getItem('token') ; 

      if(token) {
        let decodedToken = jwtDecode(token) ; 

        const isExpired = decodedToken && decodedToken.exp
        ? decodedToken.exp < Date.now() / 1000
        :false ;

        if(isExpired) {

          localStorage.removeItem('token') ; 
          localStorage.removeItem('user') ; 

          this.router.navigateByUrl('/login')
        }else {

          //console.log("Has a login token");
          
          // Edit the request.
          const request = req.clone({ headers: req.headers.set('Authorization', `bearer ${token}` )})
          
          return next.handle(request);

        }

      }
    }

    return next.handle(req);

  }
}
