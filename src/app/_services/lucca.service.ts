import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { LuccaLeave } from "../_models/LuccaLeave.model";
import { LiveURL } from "../_enums/StaticValues.enum";
let headers = new HttpHeaders();

@Injectable({
  providedIn: 'root'
})

export class LuccaService {
  headers = headers.set('Content-Type', 'application/json; charset=utf-8').append('Authorization', 'lucca application=df45695d-14f6-4274-8d4a-27601f3ee64a').append('Access-Control-Allow-Origin', ['*']).append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE').append('Access-Control-Allow-Headers', 'Content-Type');
  constructor(private httpClient: HttpClient) {

  }
  // get List Leave reauest from Lucca
  getListLeaves(ownerId: Number, date: String, paging: Number): Observable<any> {
    return this.httpClient.get("http://localhost:8088/"+ownerId+"&"+date+"&"+paging);
  }
 getIntegrate() {
  return this.httpClient.post('http://localhost:8088/integrate', null);
 }
  getMidDayLeave(url: string): Observable<any> {
    return this.httpClient.get(url);
  }
  
  sendDate(data:any): Observable<any> {
    return this.httpClient.post("http://localhost:8080/webhook", data);
  }
}
