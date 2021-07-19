import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse } from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
let users = [
    { 
        email:'demo',
        password:'demo'
    }
]

Injectable()
export class FakeBackEndInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;

    if(request.url.endsWith("login")){}
    const customReq = request.clone({
    
    });

    return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .pipe(delay(500))
            .pipe(dematerialize());

    function handleRoute():Observable<HttpEvent<any>> {
        switch (true) {
            case url.endsWith('/login') && method === 'POST':
                return authenticate();
            default:
                // pass through any requests not handled above
                return next.handle(request);
        }    
    }

    function authenticate() {
        const user = users.find(x => x.email === body.email && x.password === body.password);
            if (!user) return error('Username or password is incorrect');
            return ok({
                email: user.email,
                token: 'fake-jwt-token'
            })
    }

    function ok(body?:any) {
        return of(new HttpResponse({ status: 200, body }))
    }

    function error(message:any) {
        return throwError({ error: { message } });
    }

    function unauthorized() {
        return throwError({ status: 401, error: { message: 'Unauthorised' } });
    }

    function isLoggedIn() {
        return headers.get('Authorization') === 'Bearer fake-jwt-token';
    }


    


  }

 

  
}


