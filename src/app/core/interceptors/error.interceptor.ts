import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

import { SnackbarComponent } from 'src/app/components/snackbar/snackbar.component';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private snackBar: MatSnackBar) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {

        if (error.status === 400) {
          return throwError(() => error);
        }

        let message = '';

        if (error.status === 0) {
          message = 'Server not reachable';
        }
        else if (error.status === 500) {
          message = 'Something went wrong';
        }

        this.snackBar.openFromComponent(SnackbarComponent, {
          data: { message, type: 'error' },
          duration: 3000,
        });

        return throwError(() => error);
      })
    );
  }
}
