  
  

  export const required = 'required';
  export const minLength= 'minLength';
  export const email    = 'email';

  /////////////////////////
  //VALIDATORS MSG error////
  ////////////////////////

  export function requiredErrorString(): string {

    return 'This field is required';
  }

  export function minLengthErrorString(minLength: number): string {

    return 'Min ' + minLength.toString() + ' characters are allowed'
  }

  export function emailErrorString(): string {

    return 'Your email pattern is incorrect';
  }