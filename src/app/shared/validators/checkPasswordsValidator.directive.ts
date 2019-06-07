import { FormGroup } from '@angular/forms';

export function checkPasswordsValidator(group: FormGroup) {
  let pass = group.controls.password.value;
  let confirmPass = group.controls.confirmPassword.value;
  return pass === confirmPass ? null : { notSame: true }
}