import { Injectable, NgZone } from '@angular/core';
import { auth } from 'firebase/app';
import { User } from './user';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: User;

  constructor(
    public router: Router,
    public ngZone: NgZone,
    public afAuth: AngularFireAuth,
    private angularFireAuth: AngularFireAuth
  ) {
    this.afAuth.authState.subscribe((user) => {
      this.user = user;
    });
  }

  // Firebase SignInWithPopup
  OAuthProvider(provider) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((res) => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        });
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  // Firebase Facebook Sign-in
  SigninWithFacebook() {
    return this.OAuthProvider(new auth.FacebookAuthProvider())
      .then((res) => {
        console.log('Successfully Facebook logged in!');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // Firebase Google Sign-in
  SigninWithGoogle() {
    return this.OAuthProvider(new auth.GoogleAuthProvider())
      .then((res) => {
        console.log('Successfully Google logged in!');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // Firebase Logout
  SignOut() {
    return this.afAuth.signOut().then(() => {
      this.router.navigate(['login']);
    });
  }
}
