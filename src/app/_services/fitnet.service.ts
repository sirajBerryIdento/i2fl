import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { FitnetLeave } from "../_models/LeaveFitnet.model";
let headers = new HttpHeaders();

@Injectable({
    providedIn: 'root'
})
export class FitnetService {
    headers = headers.set('Content-Type', 'application/json; charset=utf-8').append('Authorization', 'Basic c2lyYWouYmVycnlAaWRlbnRvLmZyOnRlc3QxMjMh'); // get apiKeyUUID 

    constructor(private httpClient: HttpClient) {

    }
    // post List Leave reauest from Lucca
    postLeaves(leave: FitnetLeave): Observable<any> {
        return this.httpClient.post("https://evaluation.fitnetmanager.com/FitnetManager/rest/leaves/create", leave, { headers: this.headers });
    }

    getLeave(companyId: Number,month: Number, year: Number): Observable<any>{
        return this.httpClient.get("https://evaluation.fitnetmanager.com/FitnetManager/rest/leaves/getLeavesWithRepartition/"+companyId+"/"+month+"/"+year,{ headers: this.headers })
    }

    deleteLeaves(leaveId: Number): Observable<any> {
        return this.httpClient.delete("https://evaluation.fitnetmanager.com/FitnetManager/rest/leaves/delete/" + leaveId, { headers: this.headers });
    }
}
