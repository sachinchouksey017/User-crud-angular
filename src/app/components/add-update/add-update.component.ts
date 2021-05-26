import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { UtilityService } from '../../services/utility/utility.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
export interface DialogData {
  email: '',
  name: '',
  userId: ''
  type: '',
  gender: '',
  address: '',
  dob: '',
  profileUrl: '',
  index: number
}
@Component({
  selector: 'app-add-update',
  templateUrl: './add-update.component.html',
  styleUrls: ['./add-update.component.scss']
})
export class AddUpdateComponent implements OnInit {
  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email, Validators.required]),
    type: new FormControl(''),
    index: new FormControl(-1),
    userId: new FormControl(''),
    gender: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    dob: new FormControl('', [Validators.required]),
  });
  selectedType = 'add'
  constructor(public UtilityService: UtilityService,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    console.log('data is ', data);
    this.selectedType = data.type
    this.registerForm.setValue({
      name: data.name,
      email: data.email,
      gender: data.gender,
      address: data.address,
      dob: new Date(data.dob),
      userId: data.userId ? data.userId : '',
      type: data.type ? data.type : '',
      index: data.index ? data.index : -1
    })
  }

  ngOnInit() {
  }
  register() {
    console.log(this.registerForm.value);

    if (this.registerForm.invalid) {
      this.UtilityService.markFormGroupTouched(this.registerForm)
    } else {
      this.dialogRef.close(this.registerForm.value);
    }
  }
  getErrorMessage(control: AbstractControl, alias: string) {
    return this.UtilityService.getErrorMessage(control, alias)
  }
  close() {
    this.dialogRef.close(true);
  }

}



