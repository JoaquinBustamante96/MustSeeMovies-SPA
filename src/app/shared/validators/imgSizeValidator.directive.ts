import { AbstractControl,ValidatorFn } from '@angular/forms';

export function imgSizeValidatorValidator(size:number): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      let valid = true;
    if(control.value && control.value.size>size){ 
        valid=false;
    }
      return (valid) ? null : {'forbiddenSize': {value: true}} ;
    }
  }