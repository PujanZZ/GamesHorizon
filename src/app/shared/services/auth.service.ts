import { Injectable, NgZone } from '@angular/core';
import { User } from '../services/user';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject, map, of } from 'rxjs';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userDataSubject = new BehaviorSubject<any>(null);
  public  userData$ = this.userDataSubject.asObservable(); //to save user data after login
  public isAuthenticated = false;

  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    public errorMessage: ErrorService,
    
  ) {

    // saving user data when logged in and null when logged out
    this.afAuth.authState.subscribe(user => {

      this.isAuthenticated = !!user;

      this.userDataSubject.next(user);

    });
  }

  isLoggedIn() {
    return !!this.afAuth.currentUser;
  }
  
  get isAuthenticated$() {
    return this.userData$.pipe(map(user => !!user));
  }
 
  get isAuthenticatedfn() {
    return this.isAuthenticated;
  }

  async SignIn(email: string, password: string) {
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(email, password);
      this.afAuth.authState.subscribe((user) => {
        if (user) {
          console.log(user)
        }
      });
    }
    catch (error: any) {
      this.errorMessage.setLoginError(error)
    }
  }

  async SignUp(email: string, password: string,name: string) {
    try {
      const res = await this.afAuth.createUserWithEmailAndPassword(email, password);
      this.SetUserData(res.user);

      res.user?.updateProfile({
        displayName:name
      }).then(function(){
        var displayName = res.user?.displayName;
      })
    }
    catch (error: any) {
      this.errorMessage.setRegisterError(error)
    }
  }

  async SignOut() {
    await this.afAuth.signOut();
    this.router.navigate(['login']);
  }



  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      id: user.uid,
      email: user.email,
      displayName: user.displayName,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }
  
  

}
