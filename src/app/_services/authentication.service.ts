import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { from } from 'rxjs';

let headers = new HttpHeaders();

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    headers = headers.set('Content-Type', 'application/json; charset=utf-8').append('Authorization', 'Basic c2lyYWouYmVycnlAaWRlbnRvLmZyOnRlc3QxMjMh'); // get apiKeyUUID 

    constructor(private httpClient: HttpClient) { }

  
}
