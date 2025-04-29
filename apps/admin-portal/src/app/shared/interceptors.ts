import {
	HttpEvent,
	HttpEventType,
	HttpHandler,
	HttpHandlerFn,
	HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { LoaderService } from '../services/loader.service';

export function authInterceptor(
	req: HttpRequest<unknown>,
	next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
	const token = inject(AuthService).getToken();
	const authReq = req.clone({
		headers: req.headers.set('Authorization', `Bearer ${token}`),
	});
	return next(authReq);
}
export function loaderInterceptor(
	req: HttpRequest<unknown>,
	next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
	const loaderService = inject(LoaderService);
	return next(req).pipe(
		tap((event) => {
			if (event.type === HttpEventType.Sent) {
				loaderService.showLoader();
				console.log(req.url, 'Request sent', event.type);
			} else if (event.type === HttpEventType.Response) {
				loaderService.hideLoader();
				console.log(req.url, 'returned a response with status', event.status);
			}
		}),
		catchError((error) => {
			loaderService.hideLoader();
			if (error.status === 401) {
				//inject(AuthService).logoutUser();
			}
			return throwError(() => error);
		}),
	);
}
