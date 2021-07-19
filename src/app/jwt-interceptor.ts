import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse } from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { ApiService } from "./api.service";

@Injectable({ providedIn: 'root' })
export class JwtInterceptor implements HttpInterceptor {
    constructor(private apiService: ApiService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let loggedIn = this.apiService.isAuthenticated();
        if (loggedIn ) {
            request = request.clone({
                setHeaders: { 
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
        }

        return next.handle(request);
    }
}


