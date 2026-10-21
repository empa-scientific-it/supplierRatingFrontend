import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Keys under which the login data is stored in the browser's localStorage.
 * Used by the login page, the HTTP interceptor and the AuthService (single source of truth).
 */
export const AUTH_STORAGE_KEYS = {
  TOKEN: 'openbis_token',
  USERNAME: 'username',
} as const;

/**
 * Converts an openBIS user id into a readable name.
 * openBIS user ids at Empa have the form "firstname.lastname_AT_empa.ch".
 * The part before "_AT_" (or "@") is split at the dots, and each part is capitalized:
 * "anusch.bachofner_AT_empa.ch" -> "Anusch Bachofner".
 * User ids without a dot (e.g. "admin") are shown unchanged.
 *
 * @param userId The openBIS user id returned by the backend after login.
 * @returns The readable name.
 */
export function toDisplayName(userId: string): string {
  // Local part of the e-mail address: everything before "_AT_" or "@"
  const localPart = userId.split(/_AT_|@/)[0];

  // Not a "firstname.lastname" id (e.g. "admin"): show it as it is
  if (!localPart.includes('.')) {
    return localPart;
  }

  return localPart
    .split('.')
    .filter(part => part.length > 0)
    .map(capitalize)
    .join(' ');
}

/**
 * Capitalizes the first letter of a name part, also after hyphens ("anna-lena" -> "Anna-Lena").
 */
function capitalize(namePart: string): string {
  return namePart
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('-');
}

/**
 * Service for the logged-in user: provides the display name and handles logout.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private router = inject(Router);

  /**
   * Returns the readable name of the logged-in user (see {@link toDisplayName}).
   */
  getDisplayName(): string {
    const userId = localStorage.getItem(AUTH_STORAGE_KEYS.USERNAME) ?? '';
    return toDisplayName(userId);
  }

  /**
   * Logs the user out: removes the token and the username from the browser
   * and navigates back to the login page.
   */
  logout(): void {
    localStorage.removeItem(AUTH_STORAGE_KEYS.TOKEN);
    localStorage.removeItem(AUTH_STORAGE_KEYS.USERNAME);
    this.router.navigate(['/login']);
  }
}
