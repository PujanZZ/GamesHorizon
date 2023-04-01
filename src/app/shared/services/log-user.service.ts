import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ErrorService } from './error.service';
import { Observable, Subscription, map, of } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { AngularFirestore, QuerySnapshot } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class LogUserService {

  public error: string | undefined;
  public showSpinner = false;
  public showSpinnerRegister = false;
  subs: Subscription;


  constructor(
    public authService: AuthService,
    public afAuth: AngularFireAuth,
    private router: Router,
    public errorMessage: ErrorService,
    private firestore: AngularFirestore,
  ) { 

    this.subs = new Subscription;
  }

  formGroup = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
  })

  handleLoginClick(email: string, password: string) {

    this.showSpinner = true;

    setTimeout(() => {
      this.authService.SignIn(email, password)
        .then(() => {
          this.authService.afAuth.authState.subscribe((user) => {
            if (user) {
              const uid = user.uid
              const queryParams = { uid: uid };

              this.router.navigate(['/home']);

            } else {
              this.error = 'User not found';
            }
          });
        })
        .catch(error => {
          console.error(error);
          this.error = error.message;
        })
        .finally(() => {
          this.showSpinner = false;
        })
    }, 2000);
  }


  handleLogout() {

    this.showSpinner = true;

    setTimeout(() => {
      this.authService.SignOut()
        .then(() => {
          this.router.navigate(['/']);
        })
        .catch(error => {
          console.error(error);
          this.error = error;
        })
        .finally(() => {
          this.showSpinner = false;
        })
    }, 2000);
  }


  handleCreateClick(email: string, password: string, name: string) {
    this.showSpinnerRegister = true;
    setTimeout(() => {
    this.authService.SignUp(email, password, name)
      .then(() => {
        this.authService.SetUserData(this.authService.afAuth.currentUser);

      })
      .catch(error => {
        console.error(error);
        this.error = error;
      })
      .finally(() => {
        this.showSpinnerRegister = false;
      })
    },2000);
  }

  handleUpdateUserName(userName: string) {

    const subs1 = this.afAuth.user.subscribe((user)=>{
        
      if(user){
        user.updateProfile({
          displayName: userName
        }).then(()=> {
          console.log("username updated")
        }).catch((error)=> {
          this.error = error;
        })
      }
    })

    this.subs.add(subs1)
  }
  


  getDocument(uuid: string | undefined,slug: string): Observable<any> {
    if (this.firestore.collection(`${uuid}`)) {
      const docRef = this.firestore.collection(`${uuid}`).doc(slug);
      return docRef.get();
    } else {
      console.log('User has no document');
      return of(null)
    }
  }

  getDocumentOfUser(uuid: string | undefined): Observable<any> {
    const collectionRef = this.firestore.collection(`${uuid}`);

    return collectionRef.get().pipe(
      map((querySnapshot) => {
        return querySnapshot.docs.map((doc) => doc.data());
      })
    );
  }

  getUsersList(): Observable<QuerySnapshot<any>> {
    const docRef = this.firestore.collection(`users`)
    return docRef.get();
  }

 




}
