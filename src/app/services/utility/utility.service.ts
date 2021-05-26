import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(private _snackBar: MatSnackBar) { }
  getErrorMessage(control: AbstractControl, alias: string) {
    let value = ''
    if (control.errors) {
      if (control.errors.required) {
        value = alias + ' is required';
      }

      if (control.errors.pattern) {
        value = 'Invalid ' + alias.toLowerCase();
      }
      if (control.errors.minlength) {
        value = alias + ' should have at least ' + control.errors.minlength.requiredLength + ' characters';
      }
      if (control.errors.maxlength) {
        value = alias + ' should not have more than ' + control.errors.maxlength.requiredLength + ' characters';
      }
      if (control.errors.min) {
        value = alias + ' should be greater than ' + control.errors.min.min;
      }
      if (control.errors.max) {
        value = alias + ' can not be greater than ' + control.errors.max.max;
      }
      if (control.errors.email) {
        value = alias + ' is not valid';
      }
    }
    return value
  }
  /**
* Marks all controls in a form group as touched
* @param formGroup - The form group to touch
*/
  public markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach((control: any) => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

  openSnackBar(message: string, action: string, duration = 3000) {
    this._snackBar.open(message, action, {
      duration: duration,
    });
  }

}
