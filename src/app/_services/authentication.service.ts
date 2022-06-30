import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
let headers = new HttpHeaders();

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    headers = headers.set('Content-Type', 'application/json; charset=utf-8').append('Authorization', 'Basic c2lyYWouYmVycnlAaWRlbnRvLmZyOnRlc3QxMjMh'); // get apiKeyUUID 

    constructor(private httpClient: HttpClient) { }

    authenticate() { // change this
        return "siraj.berry@idento.fr";
    }
}
