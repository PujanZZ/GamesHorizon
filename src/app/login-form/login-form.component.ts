import { Component } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { LogUserService } from '../shared/services/log-user.service';
import { ErrorService } from '../shared/services/error.service';
import { email, emailErrorString, minLength, minLengthErrorString, required, requiredErrorString } from '../shared/services/shared.resources';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

  errorText: any;
  userForm = new FormGroup({
    email: new FormControl<string | null>('', [Validators.required, Validators.email]),
    password: new FormControl<string | null>('', [Validators.required, Validators.minLength(8)]),
  })
  error!: HttpErrorResponse
  hide: boolean = true;

  constructor(
    public authService: AuthService,
    public afAuth: AngularFireAuth,
    public logService: LogUserService,
    private router: Router,
    public someErrors: ErrorService,

  ) {

  }

  get userData$() {
    return this.authService.userData$;
  }

  get spinner() {
    return this.logService.showSpinner
  }

  ngOnInit() {}

  handleLoginClick(email: string, password: string) {
      this.logService.handleLoginClick(email, password)
   }

  get setError() {
    return this.someErrors.getLoginError()
   }

  ////////////////////////
  //Some extra functions//
  ////////////////////////


  onMobile(): boolean {
    return window.innerWidth <= 700;
  }

  loginDisabled(): boolean {
    return this.userForm.invalid || !this.userForm.dirty
  }
  
  //////////////////////////
  /// validations //////////
  //////////////////////////

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
