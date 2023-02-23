import { Directive, Input } from '@angular/core';
import {AbstractControl, FormGroup, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn, Validators} from '@angular/forms';

@Directive({
  selector: '[appConfirmPassword]',
  providers: [{provide: NG_VALIDATORS, useExisting: ConfirmPasswordDirective, multi: true}]
})
export class ConfirmPasswordDirective implements Validator{

  constructor() { }

  @Input('firstField') firstField: string  ;
  @Input('secondField') secondField: string ;

  validate(form: FormGroup): ValidationErrors | null {

    if(!form.controls[this.firstField] || !form.controls[this.secondField]){
      return null ;
    }

    if(Object.keys(form.controls[this.firstField]?.errors || []).filter(x=> x != 'confirmPasswordValidator').length > 0 ||
    Object.keys(form.controls[this.secondField]?.errors || []).filter(x=> x != 'confirmPasswordValidator').length > 0 ) {
      return null ;
    }

    if(form.controls[this.firstField].value !== form.controls[this.secondField].value){
      form.controls[this.firstField].setErrors({ confirmPasswordValidator: true});
      form.controls[this.secondField].setErrors({ confirmPasswordValidator: true});
      return { confirmPasswordValidator: true}
    }

    if(form.controls[this.firstField].hasError('confirmPasswordValidator')) {
      delete form.controls[this.firstField]?.errors?.['confirmPasswordValidator'] ;
      form.controls[this.firstField]?.setErrors(null) ;
    }

    if(form.controls[this.secondField].hasError('confirmPasswordValidator')) {
      delete form.controls[this.secondField]?.errors?.['confirmPasswordValidator'] ;
      form.controls[this.secondField]?.setErrors(null) ;

    }

    return null ;
  }
  registerOnValidatorChange?(fn: () => void): void {
    throw new Error('Method not implemented.');
  }

}
