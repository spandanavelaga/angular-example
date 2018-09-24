import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let loggedInUser = JSON.parse(localStorage.getItem('currentUser'));
        if (loggedInUser && loggedInUser.token) {
            request = request.clone({
                setHeaders: { 
                    Authorization: `Bearer ${loggedInUser.token}`
                }
            });
        }

        return next.handle(request);
    }
}