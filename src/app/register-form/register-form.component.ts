import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { LogUserService } from '../shared/services/log-user.service';
import { ErrorService } from '../shared/services/error.service';
import { Observable, Subscription, map, switchMap, timer } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { QuerySnapshot } from '@angular/fire/compat/firestore';
import { required, requiredErrorString, minLength, minLengthErrorString, email, emailErrorString } from '../shared/services/shared.resources';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent {
  error: any;
  isLoading: boolean = false;
  subs: Subscription;
  hide: boolean = true;

  userForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email],[this.validateEmail.bind(this)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  })

  constructor(
    public authService: AuthService,
    public router: Router,
    public someErrors: ErrorService,
    public logService: LogUserService,
  ) { 
    this.subs = new Subscription;
  }

  ngOnInit() {

  ///////////////////////
  /// VALIDATIONS CHECK//
  ////////////////////////

  // const subs1 = this.logService.getUsersList().subscribe((doc: QuerySnapshot<any>)=>{
  //   // docs.subscribe((querySnapshot: QuerySnapshot<any>) => {
  //   //   console.log(querySnapshot.docs.map(doc => doc.data()));
  //   // });
  //     const x = doc.docs.map(realDoc => realDoc.data())   
  //     const y = x.map(a => a.email)
  //     console.log(y)

  // })

  }

  ngOnDestroy() {
    this.subs.unsubscribe()
  }

  get registerError() {
    return this.someErrors.getRegisterError()
  }


  handleCreateClick(email: string, password: string, name: string) {
    this.isLoading = true;
    setTimeout(() => {
      this.authService.SignUp(email, password, name)
      .finally(() => {
        this.isLoading = false;
        this.router.navigate(['/home'])
      })
    }, 2000)

  }


  loginDisabled(): boolean {
    return (
      this.userForm.pending || // Check for async validators that are still running
      this.userForm.invalid || 
      (this.userForm.pristine && !this.userForm.dirty) // Check for untouched form
    );
  }
  

  onMobile(): boolean {
    return window.innerWidth <= 700;
  }

  //////////////////
  ///// email///////
  //////////////////

  validateEmail(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.logService.getUsersList().pipe(
      map((querySnapshot) => {
        const x = querySnapshot.docs.map(realDoc => realDoc.data());   
        const y = x.map(a => a.email);

        return y.includes(control.value) ? { emailTaken: true } : null;
      })
    );
  }

  getNameError(): string {
    const ctrl: FormControl = this.userForm.get('name') as FormControl;
    return ctrl.hasError(required) ? requiredErrorString() : ''
  }

  getPasswordError(): string {
    const ctrl: FormControl = this.userForm.get('password') as FormControl;


    return ctrl.hasError(required) ? requiredErrorString() : 
          ctrl.hasError(minLength) ? minLengthErrorString(8) : 'Min ' + 8 + ' characters are required'
  }

  getEmailError(): string {
    const ctrl: FormControl = this.userForm.get('email') as FormControl;

    return ctrl.hasError(required) ? requiredErrorString() : 
          ctrl.hasError(email) ? emailErrorString() : ''
  }

}
