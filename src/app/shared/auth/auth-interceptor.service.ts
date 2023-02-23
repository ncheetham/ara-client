import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, Observable, take } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { User } from 'src/app/user/user';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{

  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    //console.log("in Interceptor") ;

    return this.authService.user.pipe(
      take(1),
      exhaustMap((user: User) => {

        if(!user.loginToken) {
          return next.handle(req) ;
        }
        //console.log("Has a login token");
        const headers= new HttpHeaders()
        .set('Authorization', 'Bearer ' + user.loginToken)

        // Edit the request.
        const modReq = req.clone(
          { headers :  headers })
        return next.handle(modReq) ;
      })
    );

  }
}
