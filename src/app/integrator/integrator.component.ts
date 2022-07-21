import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TitleStrategy } from '@angular/router';
import { Observable } from 'rxjs';
import { HelperComponent } from '../helper/helper.component';
import { StaticValues } from '../_enums/StaticValues.enum';
import { FitnetLeave } from '../_models/LeaveFitnet.model';
import { AuthenticationService } from '../_services/authentication.service';
import { FitnetService } from '../_services/fitnet.service';
import { LuccaService } from '../_services/lucca.service';
import { WebsocketService } from '../_services/Websocket.service';
let headers = new HttpHeaders();

@Component({
  selector: 'app-integrator',
  templateUrl: './integrator.component.html',
  styleUrls: ['./integrator.component.css']
})
export class IntegratorComponent extends HelperComponent implements OnInit {
  luccaLeaves = [];
  meesages : any[] = [];
  received : any[] = [];
  
  /*static values to change section starts here */
  // luccaLeaves = [
  //   {
  //     "id": "32710-20220711-PM",
  //     "name": "32710-20220711-PM",
  //     "url": "https://i-tracing.ilucca-test.net/api/v3/leaves/32710-20220711-PM",
  //     "data": {
  //       "isAM": false
  //     }
  //   },
  //   {
  //     "id": "32710-20220711-AM",
  //     "name": "32710-20220711-AM",
  //     "url": "https://i-tracing.ilucca-test.net/api/v3/leaves/32710-20220711-AM",
  //     "data": {
  //       "isAM": true
  //     }
  //   },
  //   {
  //     "id": "32710-20220712-PM",
  //     "name": "32710-20220712-PM",
  //     "url": "https://i-tracing.ilucca-test.net/api/v3/leaves/32710-20220712-PM",
  //     "data": {
  //       "isAM": false
  //     }
  //   },
  //   {
  //     "id": "32710-20220712-AM",
  //     "name": "32710-20220712-AM",
  //     "url": "https://i-tracing.ilucca-test.net/api/v3/leaves/32710-20220712-AM",
  //     "data": {
  //       "isAM": true
  //     }
  //   }
  // ];
  luccaPayload = [{ // to be changed to dynamic values
    "id": "78287-20180424-PM",
    "date": "2022-09-12",
    "isAm": false,
    "owner": {
      "id": 1583, // use this for authentication
      "name": "Luca Pacioli",
      "email": "siraj.berry@idento.fr",
      "employeeNumber": "00001"
    },
    "leaveAccount": {
      "id": 1718,
      "name": "Annual leave 2018",
      "categoryId": 1,
      "categoryName": "Annual leave"
    },
    "isConfirmed": true,
    "confirmationDate": "2018-04-04T22:34:47.797",
    "isCancelled": false,
    "cancellationDate": ""
  }];;

  email = ""; // update this to be on each user
  ownerId = 0; // update this to be on each user

  LeaveType = StaticValues.LEAVE_TYPE;
  leaveId: Number = 0; // change this 
  /* static values to change section ends here */


  constructor(private websocketsService: WebsocketService, private fitnetService: FitnetService, private luccaService: LuccaService, private authenticationService: AuthenticationService) {
    super();
    // this.luccaService.getWebhook().subscribe(res=>console.log("res: ",res))
  }
  headers = headers.set('Content-Type', 'application/json; charset=utf-8').append('Authorization', 'lucca application=df45695d-14f6-4274-8d4a-27601f3ee64a'); // get apiKeyUUID 



  deleteLeave() {// Called when the user wants to delete his leave
    var payloadLeave = this.luccaPayload[0];// assuming that siraj took 2 days off and the payload returned an array of 4 leaves: to be checked once the webhook is fixed

    if (payloadLeave.isConfirmed) {
      var leaveDate = payloadLeave.date.split("-"); //2018-04-24
      var companyId = StaticValues.COMPANY_ID;

      var year = Number(leaveDate[0]);
      var month = Number(leaveDate[1]);
      var day = Number(leaveDate[2]);

      var luccaToFitnetDateFormat = this.luccaToFitnetDateConvertor(day, month, year);
      console.log("luccaToFitnetDateFormat: ", luccaToFitnetDateFormat)
      this.fitnetService.getLeave(companyId, month, year).subscribe(
        thisMonthLeaves => {

          if (thisMonthLeaves) {
            thisMonthLeaves.forEach((leave: any) => {
              console.log("leave", leave)
              if (leave.beginDate === luccaToFitnetDateFormat) {
                this.fitnetService.deleteLeaves(leave.leaveId).subscribe(res => { console.log("sucess") });
              }
            });
          }
        }
      );
    }
  }

  override ngOnInit(): void { }

  getLuccaPayload() {
    return [{ // to be changed to dynamic values
      "id": "78287-20180424-PM",
      "date": "2022-09-12",
      "isAm": false,
      "owner": {
        "id": 1583, // use this for authentication
        "name": "Luca Pacioli",
        "email": "siraj.berry@idento.fr",
        "employeeNumber": "00001"
      },
      "leaveAccount": {
        "id": 1718,
        "name": "Annual leave 2018",
        "categoryId": 1,
        "categoryName": "Annual leave"
      },
      "isConfirmed": true,
      "confirmationDate": "2018-04-04T22:34:47.797",
      "isCancelled": false,
      "cancellationDate": ""
    }];
  }
  getUserInfo() {
    this.ownerId = this.getLuccaPayload()[0]?.owner.id;
    this.email = this.getLuccaPayload()[0]?.owner.email;
    console.log("ownerId: " + this.ownerId + ", email: " + this.email)
  }
  integrate() {
    this.getUserInfo();

    this.getLuccaLeaves().subscribe(leaves => {
      console.log(leaves)
      if (leaves) {
        this.luccaLeaves = leaves.data.items;
        // this.integrator(this.luccaLeaves);
      }
    })
  }
  integrator(luccaLeaves: any) {
    //case of half day : to be implemented
    // case of full day : to be implemented
    if (luccaLeaves.length > 2) {
      var begin = luccaLeaves[0];
      var end = luccaLeaves[luccaLeaves.length - 1];

      var beginDate = this.getDateFromId(begin); // 20220711
      beginDate = this.transformToDateFormat(beginDate);
      var endDate = this.getDateFromId(end); // 20220712
      endDate = this.transformToDateFormat(endDate);

      var startMidday = this.isHalfDay(luccaLeaves, begin.id);
      var endMidday = this.isHalfDay(luccaLeaves, end.id);

      var fitnetLeaveRequest = new FitnetLeave(this.email, this.LeaveType, beginDate, endDate, startMidday, endMidday)
      this.setLeaves(fitnetLeaveRequest);
    }
  }

  setLeaves(fitnetLeaveRequest: any) {
    this.fitnetService.postLeaves(fitnetLeaveRequest).subscribe(data => function () {
    }, error => {
      if (error) {
        let str = error.error.text.split(".")[0].split(": ")[1];
        this.leaveId = Number(str);
      }
    })
  }
  getIntegrate() {
    return this.luccaService.getIntegrate().subscribe(res=>{console.log(res)});
  }
  getLuccaLeaves(): Observable<any> {
    return this.luccaService.getListLeaves(this.ownerId, 'between,2022-09-01,2022-09-30', 1);
  }
}

