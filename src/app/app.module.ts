import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SignUpPasswordComponent } from './sign-up-password/sign-up-password.component';
import { SignInPasswordComponent } from './sign-in-password/sign-in-password.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NavMenuComponent } from './shared/nav-menu/nav-menu.component';
import { FormsModule } from '@angular/forms';
import { ErrorInterceptor } from './services/error.interceptor';
import { AuthInterceptor } from './services/auth.interceptor';
import { MessageService } from './services/message.service';
import { AuthService } from './services/auth.service';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { ChangeEmailComponent } from './change-email/change-email.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ChangeNameComponent } from './change-name/change-name.component';
import { ChangePhotoComponent } from './change-photo/change-photo.component';
import { DeleteAccountComponent } from './delete-account/delete-account.component';
import { ProfileMainComponent } from './profile-main/profile-main.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

@NgModule({
  declarations: [
    AppComponent,
    SignUpPasswordComponent,
    SignInPasswordComponent,
    UserProfileComponent,
    HeaderComponent,
    FooterComponent,
    NavMenuComponent,
    VerifyEmailComponent,
    ChangeEmailComponent,
    ChangePasswordComponent,
    ChangeNameComponent,
    ChangePhotoComponent,
    DeleteAccountComponent,
    ProfileMainComponent,
    ForgotPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    MessageService,
    AuthService,
    HttpClientModule,
    {provide: HTTP_INTERCEPTORS,useClass:ErrorInterceptor, multi:true},
    {provide: HTTP_INTERCEPTORS,useClass:AuthInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
