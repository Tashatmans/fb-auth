import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, tap } from 'rxjs';
import { User } from '../models/user';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { MessageService } from './message.service';
import { GetRefreshTokenResponse } from '../models/get-refresh-token-response';
import { ExchangeRefreshTokenResponse } from '../models/exchange-refresh-token-response';
import { SignupPasswordResponse } from '../models/signup-password-response';
import { SigninPasswordResponse } from '../models/signin-password-response';
import { SigninGoogleResponse } from '../models/signin-google-response';
import { FetchEmailResponse } from '../models/fetch-email-response';
import { PwresetEmailResponse } from '../models/pwreset-email-response';
import { VerifyPwresetCodeResponse } from '../models/verify-pwreset-code-response';
import { ConfirmPwresetResponse } from '../models/confirm-pwreset-response';
import { ChangeEmailResponse } from '../models/change-email-response';
import { ChangePwResponse } from '../models/change-pw-response';
import { VerifyEmailResponse } from '../models/verify-email-response';
import { ConfirmVerifyEmailResponse } from '../models/confirm-verify-email-response';
import { GetUserdataResponse } from '../models/get-userdata-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiKey: string = "[API_KEY]"

  signUpWithPassword_url: string = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + this.apiKey
  signInWithPassword_url: string = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + this.apiKey
  sendOobCode_url: string = "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=" + this.apiKey
  exchangeRefreshToken_url = "https://securetoken.googleapis.com/v1/token?key=" + this.apiKey
  signInWithCustomToken_url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=" + this.apiKey
  signInWithIdp_url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithIdp?key=" + this.apiKey
  createAuthUri_url = "https://identitytoolkit.googleapis.com/v1/accounts:createAuthUri?key=" + this.apiKey
  resetPassword_url = "https://identitytoolkit.googleapis.com/v1/accounts:resetPassword?key=" + this.apiKey
  update_url = "https://identitytoolkit.googleapis.com/v1/accounts:update?key=" + this.apiKey
  lookup_url = "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=" + this.apiKey
  deleteAccount_url = "https://identitytoolkit.googleapis.com/v1/accounts:delete?key=" + this.apiKey



  user = new BehaviorSubject<User>(null)

  constructor(private http: HttpClient, private router: Router, private message: MessageService) { }

  // Exchange custom token for an ID and refresh token:
  // Purpose: You can exchange a custom Auth token for an ID and refresh token by issuing an HTTP POST request to 
  // the Auth verifyCustomToken endpoint.
  // Method: POST
  // Content-Type: application/json
  // CURL 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=[API_KEY]' 
  // Request: '{"token":"[CUSTOM_TOKEN]","returnSecureToken":true}'
  // Response: '{"idToken": "[ID_TOKEN]","refreshToken": "[REFRESH_TOKEN]","expiresIn": "3600}'
  signInWithCustomToken(token: string) {
    return this.http.post<GetRefreshTokenResponse>(this.signInWithCustomToken_url,
      { token: token, returnSecureToken: true }
    ).pipe(
      tap(response => {
        if (response) {
          this.message.success("Success")
        }
      })
    )
  }

  // Exchange a refresh token for an ID token
  // Purpose: You can refresh a Firebase ID token by issuing an HTTP POST request to 
  // the securetoken.googleapis.com endpoint.
  // Method: POST
  // Content-Type: application/x-www-form-urlencoded
  // CURL 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]' 
  // Request: 'grant_type=refresh_token&refresh_token=[REFRESH_TOKEN]'
  // Response: '{"expires_in": "3600","token_type": "Bearer","refresh_token": "[REFRESH_TOKEN]",
  // "id_token": "[ID_TOKEN]","user_id": "tRcfmLH7o2XrNELi...","project_id": "1234567890"}'
  exchangeRefreshToken(refreshToken: string) {
    const payload = new HttpParams()
    payload.set('grant_type', 'refresh_token')
    payload.set('refresh_token', refreshToken)
    return this.http.post<ExchangeRefreshTokenResponse>(this.exchangeRefreshToken_url, payload)
      .pipe(
        tap(response => {
          if (response) {
            this.message.success("Success")
          }
        })
      )
  }

  // Sign up with email / password:
  // Purpose: You can create a new email and password user by issuing an HTTP POST request to the Auth signupNewUser endpoint.
  // Method: POST
  // Content-Type: application/json
  // CURL 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]' 
  // Request: '{"email":"[user@example.com]","password":"[PASSWORD]","returnSecureToken":true}'
  // Response: '{"idToken": "[ID_TOKEN]","email": "[user@example.com]","refreshToken": "[REFRESH_TOKEN]",
  // "expiresIn": "3600","localId": "tRcfmLH7..."}'
  signUpWithPassword(email: string, password: string) {
    return this.http.post<SignupPasswordResponse>(this.signUpWithPassword_url,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(
      tap(response => {
        if (response) {
          this.message.success("User Created")
          this.handleAuthentication(
            response.email,
            response.localId,
            response.idToken,
            +response.expiresIn)
        }
      })
    )
  }

  // Sign in with email / password:
  // Purpose: You can sign in a user with an email and password by issuing an HTTP POST request to the Auth verifyPassword endpoint.
  // Method: POST
  // Content-Type: application/json
  // CURL 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]' 
  // Request: '{"email":"[user@example.com]","password":"[PASSWORD]","returnSecureToken":true}'
  // Response: '{"localId": "ZY1rJK0eYLg...","email": "[user@example.com]","displayName": "","idToken": "[ID_TOKEN]",
  // "registered": true,"refreshToken": "[REFRESH_TOKEN]","expiresIn": "3600"}'
  signInWithPassword(email: string, password: string) {
    return this.http.post<SigninPasswordResponse>(this.signInWithPassword_url, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(
      tap(response => {
        if (response) {
          this.message.success("LogIn Success")
          this.handleAuthentication(
            response.email,
            response.localId,
            response.idToken,
            +response.expiresIn)
        }
      })
    )
  }

  // Sign in with OAuth credential:
  // Purpose: You can sign in a user with an OAuth credential by issuing an HTTP POST request to 
  // the Auth verifyAssertion endpoint.
  // Method: POST
  // Content-Type: application/json
  // CURL 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithIdp?key=[API_KEY]' 
  // Request: '{"postBody":"id_token=[GOOGLE_ID_TOKEN]&providerId=[google.com]","requestUri":"[http://localhost]",
  // "returnIdpCredential":true,"returnSecureToken":true}'
  // Response: '{"federatedId": "https://accounts.google.com/1234567890","providerId": "google.com","localId": "5xwsPCWYo...",
  // "emailVerified": true,"email": "user@example.com", "oauthIdToken": "[GOOGLE_ID_TOKEN]","firstName": "John", "lastName": "Doe",
  // "fullName": "John Doe","displayName": "John Doe","idToken": "[ID_TOKEN]","photoUrl": "https://lh5.googleusercontent.com/.../photo.jpg",
  // "refreshToken": "[REFRESH_TOKEN]","expiresIn": "3600","rawUserInfo": "{\"updated_time\":\"2017-02-22T01:10:57+0000\",\"gender\":\"male\", ...}"}'
  signInWithGoogle(id_token: string) {
    return this.http.post<SigninGoogleResponse>(this.signInWithIdp_url, {
      postBody: "id_token="+id_token+"&providerId=google.com",
      requestUri: "http://localhost",
      returnIdpCredential: true,
      returnSecureToken: true
    }).pipe(
      tap(response => {
        if (response) {
          this.message.success("Success")
          this.handleAuthentication(
            response.email,
            response.localId,
            response.idToken,
            +response.expiresIn)
        }
      })
    )
  }

  // Fetch providers for email:
  // Purpose: You can look all providers associated with a specified email by issuing an HTTP POST request to
  // the Auth createAuthUri endpoint.
  // Method: POST
  // Content-Type: application/json
  // CURL 'https://identitytoolkit.googleapis.com/v1/accounts:createAuthUri?key=[API_KEY]' 
  // Request: '{"identifier":"[user@example.com]","continueUri":"[http://localhost:8080/app]"}'
  // Response: '{"allProviders": ["password","google.com"],"registered": true}'
  fetchProviderForEmail(identifier: string, continueUri: string) {
    return this.http.post<FetchEmailResponse>(this.createAuthUri_url,
      { identifier: identifier, continueUri: continueUri }
    ).pipe(
      tap(response => {
        if (response) {
          this.message.success("Success")
        }
      })
    )
  }

  // Send password reset email:
  // Purpose: You can send a password reset email by issuing an HTTP POST request to 
  // the Auth getOobConfirmationCode endpoint.
  // Method: POST
  // Content-Type: application/json
  // CURL 'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=[API_KEY]' 
  // Request: '{"requestType":"PASSWORD_RESET","email":"[user@example.com]"}'
  // Response: '{ "email": "[user@example.com]"}'
  sendPwResetEmail(email: string) {
    return this.http.post<PwresetEmailResponse>(this.sendOobCode_url,
      { requestType: "PASSWORD_RESET", email: email }
    ).pipe(
      tap(response => {
        if (response) {
          this.message.success("Sended password reset mail!")
        }
      })
    )
  }

  // Verify password reset code:
  // Purpose: You can verify a password reset code by issuing an HTTP POST request to the Auth resetPassword endpoint.
  // Method: POST
  // Content-Type: application/json
  // CURL 'https://identitytoolkit.googleapis.com/v1/accounts:resetPassword?key=[API_KEY]'
  // Request: '{"requestType":"PASSWORD_RESET","email":"[user@example.com]"}'
  // Response: '{"email": "[user@example.com]","requestType": "PASSWORD_RESET"}'
  verifyPwResetCode(oobCode: string) {
    return this.http.post<VerifyPwresetCodeResponse>(this.resetPassword_url,
      { oobCode: oobCode }
    ).pipe(
      tap(response => {
        if (response) {
          this.message.success("Success")
        }
      })
    )
  }

  // Confirm password reset:
  // Purpose: You can apply a password reset change by issuing an HTTP POST request to the Auth resetPassword endpoint.
  // Method: POST
  // Content-Type: application/json
  // CURL 'https://identitytoolkit.googleapis.com/v1/accounts:resetPassword?key=[API_KEY]'
  // Request: '{"oobCode":"[PASSWORD_RESET_CODE]","newPassword":"[NEW_PASSWORD]"}'
  // Response: '{"email": "[user@example.com]","requestType": "PASSWORD_RESET"}'
  confirmPwReset(oobCode: string, newPassword: string) {
    return this.http.post<ConfirmPwresetResponse>(this.resetPassword_url,
      { oobCode: oobCode, newPassword: newPassword }
    ).pipe(
      tap(response => {
        if (response) {
          this.message.success("Success")
        }
      })
    )
  }

  // Change email:
  // Purpose: You can change a user's email by issuing an HTTP POST request to the Auth setAccountInfo endpoint.
  // Method: POST
  // Content-Type: application/json
  // CURL 'https://identitytoolkit.googleapis.com/v1/accounts:update?key=[API_KEY]'
  // Request: '{"idToken":"[FIREBASE_ID_TOKEN]","email":"[user@example2.com]","returnSecureToken":true}'
  // Response: '{"localId": "tRcfmLH7o2...","email": "[user@example2.com]","passwordHash": "...","providerUserInfo": 
  // [{"providerId": "password","federatedId": "[user@example2.com]"}],"idToken": "[NEW_ID_TOKEN]",
  // "refreshToken": "[NEW_REFRESH_TOKEN]","expiresIn": "3600"}'
  changeEmail(idToken: string, email: string) {
    return this.http.post<ChangeEmailResponse>(this.update_url,
      { idToken: idToken, email: email, returnSecureToken: true }
    ).pipe(
      tap(response => {
        if (response) {
          this.message.success("Email Changed")
          // this.handleAuthentication(
          //   response.email,
          //   response.localId,
          //   response.idToken,
          //   +response.expiresIn)
        }
      })
    )
  }

        // Verify and change email verification:
  // Purpose: You can verify and change a user's email by issuing an HTTP POST request to the Auth setAccountInfo endpoint.
  // Method: POST
  // Content-Type: application/json
  // CURL 'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=[API_KEY]'
  // Request: '{"requestType":"VERIFY_AND_CHANGE_EMAIL","idToken":"[FIREBASE_ID_TOKEN]","newEmail": "[user@example2.com]"}'
  // Response: '{"email": "[user@example2.com]"}'
  verifyAndChangeEmail(idToken: string, newEmail: string) {
    return this.http.post<VerifyEmailResponse>(this.sendOobCode_url,
      { requestType: "VERIFY_AND_CHANGE_EMAIL",idToken:idToken, newEmail: newEmail }
    ).pipe(
      tap(response => {
        if (response) {
          this.message.success("verification mail sended!")
        }
      })
    )
  }

  // Change password:
  // Purpose: You can change a user's password by issuing an HTTP POST request to the Auth setAccountInfo endpoint.
  // Method: POST
  // Content-Type: application/json
  // CURL 'https://identitytoolkit.googleapis.com/v1/accounts:update?key=[API_KEY]'
  // Request: '{"idToken":"[FIREBASE_ID_TOKEN]","password":"[NEW_PASSWORD]","returnSecureToken":true}'
  // Response: '{"localId": "tRcfmLH7o2...","email": "[user@example2.com]","passwordHash": "...","providerUserInfo": 
  // [{"providerId": "password","federatedId": "[user@example2.com]"}],"idToken": "[NEW_ID_TOKEN]",
  // "refreshToken": "[NEW_REFRESH_TOKEN]","expiresIn": "3600"}'
  changePassword(idToken: string, password: string) {
    return this.http.post<ChangePwResponse>(this.update_url,
      { idToken: idToken, password: password, returnSecureToken: true }
    ).pipe(
      tap(response => {
        if (response) {
          this.message.success("Password Changed")
          this.handleAuthentication(
            response.email,
            response.localId,
            response.idToken,
            +response.expiresIn)
        }
      })
    )
  }



  // Update profile:
  // Purpose: You can update a user's profile (display name / photo URL) by issuing an HTTP POST request to 
  // the Auth setAccountInfo endpoint.
  // Method: POST
  // Content-Type: application/json
  // CURL 'https://identitytoolkit.googleapis.com/v1/accounts:update?key=[API_KEY]'
  // Request: '{"idToken":"[ID_TOKEN]","displayName":"[NAME]","photoUrl":"[URL]","returnSecureToken":true}'
  // Response: '{"localId": "tRcfmLH7o2...","email": "[user@example2.com]","passwordHash": "...","providerUserInfo": 
  // [{"providerId": "password","federatedId": "[user@example2.com]"}],"idToken": "[NEW_ID_TOKEN]",
  // "refreshToken": "[NEW_REFRESH_TOKEN]","expiresIn": "3600"}'
  updateProfile(idToken: string, displayName?: string,photoUrl?:string) {
    return this.http.post<ChangePwResponse>(this.update_url,
      { idToken: idToken, displayName: displayName, photoUrl:photoUrl, returnSecureToken: true }
    ).pipe(
      tap(response => {
        if (response) {
          this.message.success("Updated Profil")
        }
      })
    )
  }


  // Get user data:
  // Purpose: You can get a user's data by issuing an HTTP POST request to the Auth getAccountInfo endpoint.
  // Method: POST
  // Content-Type: application/json
  // CURL 'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=[API_KEY]'
  // Request: '{"idToken":"[ID_TOKEN]","displayName":"[NAME]","photoUrl":"[URL]","returnSecureToken":true}'
  // Response: '{"users": [{"localId": "ZY1rJK0...","email": "user@example.com","emailVerified": false,
  // "displayName": "John Doe","providerUserInfo": [{"providerId": "password","displayName": "John Doe",
  // "photoUrl": "http://localhost:8080/img1234567890/photo.png","federatedId": "user@example.com","email": "user@example.com",
  // "rawId":"user@example.com","screenName": "user@example.com"}],"photoUrl":"https://lh5.googleusercontent.com/.../photo.jpg",
  // "passwordHash": "...","passwordUpdatedAt": 1.484124177E12, "validSince": "1484124177","disabled": false,
  // "lastLoginAt": "1484628946000","createdAt": "1484124142000","customAuth": false"]}'
  getUserData(idToken: string) {
    return this.http.post<GetUserdataResponse>(this.lookup_url,
      { idToken: idToken }
    ).pipe(
      tap(response => {
        if (response) {
          this.message.success("Information was successfully obtained")
        }
      })
    )
  }

  // Send email verification:
  // Purpose: You can send an email verification for the current user by issuing an HTTP POST request to 
  // the Auth getOobConfirmationCode endpoint.
  // Method: POST
  // Content-Type: application/json
  // CURL 'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=[API_KEY]'
  // Request: '{"requestType":"VERIFY_EMAIL","idToken":"[FIREBASE_ID_TOKEN]"}'
  // Response: '{"email": "[user@example2.com]"}'
  SendEmailVerification(idToken: string) {
    return this.http.post<VerifyEmailResponse>(this.sendOobCode_url,
      { requestType: "VERIFY_EMAIL", idToken: idToken }
    ).pipe(
      tap(response => {
        if (response) {
          this.message.success("verification mail sended!")
        }
      })
    )
  }

  // Confirm email verification:
  // Purpose: You can confirm an email verification code by issuing an HTTP POST request to the Auth setAccountInfo endpoint.
  // Method: POST
  // Content-Type: application/json
  // CURL 'https://identitytoolkit.googleapis.com/v1/accounts:update?key=[API_KEY]'
  // Request: '{"idToken":"[FIREBASE_ID_TOKEN]","password":"[NEW_PASSWORD]","returnSecureToken":true}'
  // Response: '{"localId": "FhyStE...","email": "user@example.com","passwordHash": "...","providerUserInfo": 
  // [{"providerId": "password","federatedId": "user@example.com"}]}'
  confirmEmailVerification(oobCode: string) {
    return this.http.post<ConfirmVerifyEmailResponse>(this.update_url,
      { oobCode: oobCode }
    ).pipe(
      tap(response => {
        if (response) {
          this.message.success("verification code sended!")
        }
      })
    )
  }

  // Delete account:
  // Purpose: You can delete a current user by issuing an HTTP POST request to the Auth deleteAccount endpoint.
  // Method: POST
  // Content-Type: application/json
  // CURL 'https://identitytoolkit.googleapis.com/v1/accounts:delete?key=[API_KEY]'
  // Request:  '{"idToken":"[FIREBASE_ID_TOKEN]"}'
  // Response: ''
  deleteAccount(idToken: string) {
    return this.http.post(this.deleteAccount_url,
      { idToken: idToken }
    ).pipe(
      tap(response => {
        if (response) {
          this.message.success("Account Deleted")
          this.logOut
        }
      })
    )
  }

  // LogOut :
  // Purpose: You can logout a current user.
  logOut() {
    this.user.next(null)
    localStorage.removeItem("user")
    this.router.navigate(["/login"])
  }

  // Auto Login :
  // Purpose: You can login automotical a current user.
  autoLogin() {

    const user = JSON.parse(localStorage.getItem("user"))

    if (!user) {
      this.router.navigate(["/login"])
      return
    }

    const loadUser = new User(
      user.localId,
      user.email,
      user._token,
      new Date(user._tokenExpirationDate),
    )

    if (loadUser.token) {
      this.user.next(loadUser)
    } else {
      this.logOut()
    }


  }

  // Handle Authentication :
  // Purpose: You can handle to local storage a current user.
  handleAuthentication(email: string, localId: string, idToken: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + (expiresIn * 1000))

    const user = new User(
      localId,
      email,
      idToken,
      expirationDate
    )

    this.user.next(user)
    localStorage.setItem("user", JSON.stringify(user))

  }
}
