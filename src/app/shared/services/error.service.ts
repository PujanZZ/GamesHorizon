import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  private errorLoginMessage: string | null = ''
  private errorRegisterMessage: string | null = ''

  constructor() { }

  ////////////
  //LOGIN////
  ///////////
  setLoginError(message: string) {
    this.errorLoginMessage = message;
  }

  clearLoginError() {
    this.errorLoginMessage = null;
  }

  getLoginError() {
    return this.errorLoginMessage;
  }

  ////////////
  //REGISTER//
  ///////////

  setRegisterError(message: string) {
    this.errorRegisterMessage = message;
  }

  clearRegisterError() {
    this.errorRegisterMessage = null;
  }

  getRegisterError() {
    return this.errorRegisterMessage;
  }


}
