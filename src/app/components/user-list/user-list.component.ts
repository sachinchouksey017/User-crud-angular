import { Component, Input, OnInit, Output, EventEmitter, ChangeDetectorRef, ViewChild, AfterViewInit } from '@angular/core';
import { UtilityService } from '../../services/utility/utility.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddUpdateComponent } from '../add-update/add-update.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { VerifyComponent } from '../verify/verify.component';

export interface PeriodicElement {
  name: string;
  email: string,
  gender: string,
  address: string,
  dob: string,
  edit: any,
  delete: any,
  position: number
}
export interface UserElement {
  name: string;
  email: string,
  gender: string,
  address: string,
  dob: string,
  edit: any,
  delete: any,
  position: number
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, AfterViewInit {



  constructor(private UtilityService: UtilityService, public dialog: MatDialog, private changeDetectorRefs: ChangeDetectorRef) { }
  displayedColumns: string[] = ['select', 'name', 'email', 'gender', 'address', 'dob', 'edit', 'delete'];
  // dataSource = ELEMENT_DATA;
  selection = new SelectionModel<PeriodicElement>(true, []);
  dataSource = new MatTableDataSource<UserElement>([]);
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @Input()
  public set userArray(v: any[]) {
    this.dataSource.data = v;
    console.log(this.dataSource.data);
    this.changeDetectorRefs.detectChanges();
  }
  userData = {
    email: '',
    password: '',
    name: '',
    gender: 'male',
    type: 'add',
    address: '',
    dob: '',
    mobileNumber: ''
  }
  @Input() noProductCheck = false;
  @Output() messageEvent = new EventEmitter<any>();
  ngOnInit() {
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  deleteUser(row: any, index: number) {
    console.log(row);
    row.type = 'delete'
    row.index = index
    this.openVerifyDialog(row, index)
  }
  editUser(row: any, index: number) {
    console.log('row is ', row, '  ', index);
    row.type = 'update'
    row.index = index
    this.addUpdateUser(row)
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
  addUpdateUser(data = this.userData): void {
    const dialogRef = this.dialog.open(AddUpdateComponent, {
      width: '500px',
      data: data,
      panelClass: 'addUpdate'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result && result.email) {
        this.messageEvent.emit({ type: result.type, data: result })

        // tzhis.getUser()
      }
    });
  }
  openVerifyDialog(data: UserElement, index: number) {
    const dialogRefVerify = this.dialog.open(VerifyComponent, {
      data: data,
      width: '500px'
    });

    dialogRefVerify.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        this.messageEvent.emit({ type: 'delete', data: { index: index } })
        // tzhis.getUser()
      }
    });
  }
}
