import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http/http.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  userArray: any = [];
  jsonPath = "../../../assets/json/user.json";
  countData = {
    male: 0,
    female: 3
  }
  userData = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    type: 'add',
    mobileNumber: ''
  }
  noProductCheck = false;
  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.getAllData()
  }
  getAllData() {
    this.httpService.get(this.jsonPath).subscribe((data: any) => {
      console.log(data);
      this.userArray = data["user"]
      this.calculateCount()
    }, err => {
      console.log(err);

    })
  }
  calculateCount() {
    this.countData.male = this.userArray.filter((ele: any) => ele.gender && ele.gender.toLowerCase() === 'male').length
    this.countData.female = this.userArray.length - this.countData.male;
  }
  update(data: any) {
    if (data.type == 'add') {
      console.log(data, " in dash board");
      this.userArray = [...this.userArray, data.data]
      console.log(this.userArray, " in dash board");

    } else if (data.type == 'update') {
      console.log(data, " in dash board update");
      let arr = this.userArray
      arr[data.data.index] = data.data;
      this.userArray = [...arr]

    }
    else if (data.type == 'delete') {
      console.log(data, " in dash board delete");
      let arr = this.userArray;
      arr.splice(data.data.index, 1)
      this.userArray = [...arr]
    }
    this.calculateCount()
  }
}
