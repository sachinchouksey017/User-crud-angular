import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress-card',
  templateUrl: './progress-card.component.html',
  styleUrls: ['./progress-card.component.scss']
})
export class ProgressCardComponent implements OnInit {

  constructor() { }
  value = 20
  @Input() countData = {
    male: 0,
    female: 0
  }
  ngOnInit(): void {
  }

}
