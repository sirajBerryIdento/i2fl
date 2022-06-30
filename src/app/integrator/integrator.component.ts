import { Component, OnInit } from '@angular/core';
import { HelperComponent } from '../helper/helper.component';
import { StaticValues } from '../_enums/StaticValues.enum';
import { FitnetLeave } from '../_models/LeaveFitnet.model';
import { AuthenticationService } from '../_services/authentication.service';
import { FitnetService } from '../_services/fitnet.service';
import { LuccaService } from '../_services/lucca.service';

@Component({
  selector: 'app-integrator',
  templateUrl: './integrator.component.html',
  styleUrls: ['./integrator.component.css']
})
export class IntegratorComponent extends HelperComponent implements OnInit {

  /*static values to change section starts here */
  luccaLeaves = [
    {
      "id": "32710-20220711-PM",
      "name": "32710-20220711-PM",
      "url": "https://i-tracing.ilucca-test.net/api/v3/leaves/32710-20220711-PM",
      "data": {
        "isAM": false
      }
    },
    {
      "id": "32710-20220711-AM",
      "name": "32710-20220711-AM",
      "url": "https://i-tracing.ilucca-test.net/api/v3/leaves/32710-20220711-AM",
      "data": {
        "isAM": true
      }
    },
    {
      "id": "32710-20220712-PM",
      "name": "32710-20220712-PM",
      "url": "https://i-tracing.ilucca-test.net/api/v3/leaves/32710-20220712-PM",
      "data": {
        "isAM": false
      }
    },
    {
      "id": "32710-20220712-AM",
      "name": "32710-20220712-AM",
      "url": "https://i-tracing.ilucca-test.net/api/v3/leaves/32710-20220712-AM",
      "data": {
        "isAM": true
      }
    }
  ];
  luccaPayload = [{ // to be changed to dynamic values
    "id": "78287-20180424-PM",
    "date": "2018-04-24",
    "isAm": false,
    "owner": {
      "id": 134, // use this for authentication
      "name": "Luca Pacioli",
      "email": "luca.paccioli@lucca.fr",
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
  email = ""; // update this to be on each user
  LeaveType = StaticValues.LEAVE_TYPE;
  leaveId: Number = 0; // change this 
  /* static values to change section ends here */


  constructor(private fitnetService: FitnetService, private luccaService: LuccaService, private authenticationService: AuthenticationService) {
    super();
  }
  deleteLeave() {// Called when the user wants to delete his leave
    var payloadLeave = this.luccaPayload[0];// assuming that siraj took 2 days off and the payload returned an array of 4 leaves: to be checked once the webhook is fixed

    if (payloadLeave.isConfirmed) {
      var leaveDate = payloadLeave.date.split("-"); //2018-04-24
      var companyId = StaticValues.COMPANY_ID;
      var month = Number(leaveDate[1]);
      var year = Number(leaveDate[0]);

      this.fitnetService.getLeave(companyId, month, year).subscribe(
        thisMonthLeaves => {
          if (thisMonthLeaves) {
            thisMonthLeaves.forEach((leave: any) => {
              if (leave.beginDate == leaveDate) { // VERY IMP: this wont work unless u fixed the format date
                var leave_id = leave.id;
                this.fitnetService.deleteLeaves(leave_id);
              }
            });
          }
        }
      );
    }
  }
  
  override ngOnInit(): void {
    this.authentication();
  }

  authentication() {
    this.email = this.authenticationService.authenticate();
  }

  integrate() {
    this.integrator(this.luccaLeaves);
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
      console.log("data", data);
    }, error => {
      if (error) {
        let str = error.error.text.split(".")[0].split(": ")[1];
        console.log("str: ", str)
        this.leaveId = Number(str);
      }
    })
  }

  getLuccaLeaves() {
    // this.luccaService.getListLeaves().subscribe(res => {
    //   console.log("res: ", res)
    // });
    this.luccaLeaves.forEach(leave => {
      this.luccaService.getMidDayLeave(leave.url).subscribe(
        data => {
          console.log("leave: " + leave.id + " : ", data);
        }
      )
    });
    console.log("lucca leaves: ", this.luccaLeaves)
  }
  oldDeleteLeaves(leaveId: Number) {// to be deleted
    this.fitnetService.deleteLeaves(leaveId).subscribe(res => {
      console.log("res: ", res);
      alert("deleted successfully!");
    });
  }








  /* example function -- to be deleted in the future*/
  postCommentsByParameter() {
    var opt = {
      body: "body",
      title: "title",
      userId: "userId"
    }
    this.luccaService.postCommentsByParameter(opt).subscribe((data) => {
      console.log("data", data);
    })
  }
}

