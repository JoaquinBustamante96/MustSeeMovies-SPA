import { AbstractControl,ValidatorFn } from '@angular/forms';

export function imgSizeValidatorValidator(size:number): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      let valid=false;
    if(control.value && control.value.size<size){ 
        valid=true;
    }
      return (valid) ? null : {'forbiddenSize': {value: true}} ;
    }
  }