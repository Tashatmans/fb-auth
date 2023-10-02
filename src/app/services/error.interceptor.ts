import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { MessageService } from './message.service';
import { ErrorResponse } from '../models/error-response';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private auth: AuthService, private message: MessageService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(

      catchError((response: HttpErrorResponse) => {
        let message = ""

        if (response.error) {
          switch (response.message) {
            case "EMAIL_EXISTS":
              message = "The email address is already in use by another account."
              break

            case "EMAIL_NOT_FOUND":
              message = "There is no user record corresponding to this identifier. The user may have been deleted."
              break

            case "EMAIL_EXISTS":
              message = "The email address is already in use by another account."
              break

            case "MISSING_REFRESH_TOKEN":
              message = "No refresh token provided."
              break

            case "INVALID_GRANT_TYPE":
              message = "The grant type specified is invalid."
              break

            case "INVALID_REFRESH_TOKEN":
              message = "An invalid refresh token is provided."
              break

            case "CREDENTIAL_MISMATCH":
              message = "The custom token corresponds to a different Firebase project."
              break

            case "INVALID_CUSTOM_TOKEN":
              message = "The custom token format is incorrect or the token is invalid for some reason (e.g. expired, invalid signature etc.)"
              break

            case "FEDERATED_USER_ID_ALREADY_LINKED":
              message = "This credential is already associated with a different user account."
              break

            case "WEAK_PASSWORD":
              message = "The password must be 6 characters long or more."
              break

            case "TOKEN_EXPIRED":
              message = "The user's credential is no longer valid. The user must sign in again."
              break

            case "CREDENTIAL_TOO_OLD_LOGIN_AGAIN":
              message = "The user's credential is no longer valid. The user must sign in again."
              break

            case "USER_NOT_FOUND":
              message = "There is no user record corresponding to this identifier. The user may have been deleted."
              break

            case "INVALID_ID_TOKEN":
              message = "The user's credential is no longer valid. The user must sign in again."
              break

            case "EXPIRED_OOB_CODE":
              message = "The action code has expired."
              break

            case "INVALID_EMAIL":
              message = "The email address is badly formatted."
              break

            case "INVALID_IDP_RESPONSE":
              message = "The supplied auth credential is malformed or has expired."
              break

            case "USER_DISABLED":
              message = "The user account has been disabled by an administrator."
              break

            case "INVALID_PASSWORD":
              message = "The password is invalid or the user does not have a password."
              break

            case "TOO_MANY_ATTEMPTS_TRY_LATER":
              message = "We have blocked all requests from this device due to unusual activity. Try again later."
              break

            case "OPERATION_NOT_ALLOWED":
              message = "Password sign-in is disabled for this project."
              break


            default:
              message = "Something bad happened; please try again later."
              break
          }
        }

        if (response.error) {
          if (response.status == 401) {
            message = "You are'nt authorized"
            return throwError(() => {
              new Error(message)
              this.message.error(message)
            })
          }
        }

        if (response.error) {
          if (response.status == 400) {
            message = "There is no user record corresponding to this identifier. The user may have been deleted."
            return throwError(() => {
              new Error(message)
              this.message.error(message)
            })
          }
        }

        return throwError(() => {
          new Error(message)
          this.message.error(message)
        })
      }))

  }
}

// EMAIL_EXISTS: The email address is already in use by another account.
// EMAIL_NOT_FOUND: There is no user record corresponding to this identifier. The user may have been deleted.
// OPERATION_NOT_ALLOWED: Password sign-in is disabled for this project.
// TOO_MANY_ATTEMPTS_TRY_LATER: We have blocked all requests from this device due to unusual activity. Try again later.
// INVALID_PASSWORD: The password is invalid or the user does not have a password.
// USER_DISABLED: The user account has been disabled by an administrator.
// INVALID_IDP_RESPONSE: The supplied auth credential is malformed or has expired.
// INVALID_EMAIL: The email address is badly formatted.
// EXPIRED_OOB_CODE: The action code has expired.
// INVALID_OOB_CODE: The action code is invalid. This can happen if the code is malformed, expired, or has already been used.
// INVALID_ID_TOKEN:The user's credential is no longer valid. The user must sign in again.
// USER_NOT_FOUND: There is no user record corresponding to this identifier. The user may have been deleted.
// CREDENTIAL_TOO_OLD_LOGIN_AGAIN: The user's credential is no longer valid. The user must sign in again.
// TOKEN_EXPIRED: The user's credential is no longer valid. The user must sign in again.
// WEAK_PASSWORD: The password must be 6 characters long or more.
// FEDERATED_USER_ID_ALREADY_LINKED: This credential is already associated with a different user account.
// INVALID_CUSTOM_TOKEN: The custom token format is incorrect or the token is invalid for some reason (e.g. expired, invalid signature etc.)
// CREDENTIAL_MISMATCH: The custom token corresponds to a different Firebase project.
// INVALID_REFRESH_TOKEN: An invalid refresh token is provided.
// INVALID_GRANT_TYPE: the grant type specified is invalid.
// MISSING_REFRESH_TOKEN: no refresh token provided.
// API key not valid. Please pass a valid API key. (invalid API key provided)
// Invalid JSON payload received. Unknown name \"refresh_tokens\": Cannot bind query parameter. Field 'refresh_tokens' could not be found in request message.