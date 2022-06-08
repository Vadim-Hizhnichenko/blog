import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, throwError } from "rxjs";
import { AuthService } from "./services/auth.service";



@Injectable()
export class AuthInterseptor implements HttpInterceptor {
 
    constructor(private authService: AuthService, private router: Router) {
        
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        if(this.authService.isAuthenticated()){
            req = req.clone({
                setParams:{
                    auth: this.authService.token
                }
            })
        }

        return next.handle(req).pipe(catchError( (error: HttpErrorResponse) => { return throwError(error)} ))
    }
}


