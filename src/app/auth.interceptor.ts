import { HttpInterceptorFn } from '@angular/common/http';
import { AUTH_STORAGE_KEYS } from './services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // 1. Wir schauen im LocalStorage nach, ob wir einen Token haben
  const token = localStorage.getItem(AUTH_STORAGE_KEYS.TOKEN);

  // 2. Wenn ein Token da ist, "klonen" wir die Anfrage und hängen den Token an
  if (token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(authReq); // Schicke die modifizierte Anfrage ab
  }

  // 3. Wenn kein Token da ist (z.B. beim Login selbst), schicke die Anfrage normal ab
  return next(req);
};
