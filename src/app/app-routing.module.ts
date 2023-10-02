import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInPasswordComponent } from './sign-in-password/sign-in-password.component';
import { SignUpPasswordComponent } from './sign-up-password/sign-up-password.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { DeleteAccountComponent } from './delete-account/delete-account.component';
import { ChangePhotoComponent } from './change-photo/change-photo.component';
import { ChangeNameComponent } from './change-name/change-name.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ChangeEmailComponent } from './change-email/change-email.component';
import { AuthGuard } from './services/auth.guard';
import { ProfileMainComponent } from './profile-main/profile-main.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

const routes: Routes = [
  { path: "", redirectTo: "profile", pathMatch: "full" },
  { path: "login", component: SignInPasswordComponent },
  { path: "register", component: SignUpPasswordComponent },
  { path: "forgot-password", component: ForgotPasswordComponent },
  {path: "profile", component: ProfileMainComponent, 
    children: [
      {path:"", redirectTo:"user", pathMatch:"full"},
      {path: "user", component: UserProfileComponent},
      { path: "verify-email", component: VerifyEmailComponent },
      { path: "change-email", component: ChangeEmailComponent },
      { path: "change-password", component: ChangePasswordComponent },
      { path: "change-name", component: ChangeNameComponent },
      { path: "change-photo", component: ChangePhotoComponent },
      { path: "delete-account", component: DeleteAccountComponent },
    ], canActivate: [AuthGuard]},
  { path: "**", component: UserProfileComponent }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
