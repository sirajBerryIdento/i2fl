import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-helper',
  templateUrl: './helper.component.html',
  styleUrls: ['./helper.component.css']
})
export class HelperComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  getDateFromId(data: any) {
    return data.id.split("-")[1];
  }
  transformToDateFormat(date: any) { //returns this format: dd-MM-yyyy
    return date.substring(6, 8) + "/" + date.substring(4, 6) + "/" + date.substring(0, 4);
  }
  isHalfDay(luccaLeaves: any, id: any) {
    var instanceId = id.split("-");
    instanceId = instanceId[0] + "-" + instanceId[1];
    var counter = 0;
    luccaLeaves.forEach((leave: any) => {
      if (leave.id.includes(instanceId)) {
        counter++
      }
    });

    if (counter == 2) { //PM and AM
      return false;
    }
    counter = 0;
    return true;
  }
}
