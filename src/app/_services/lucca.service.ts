import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { LuccaLeave } from "../_models/LuccaLeave.model";
let headers = new HttpHeaders();

@Injectable({
  providedIn: 'root'
})

export class LuccaService {
  headers = headers.set('Content-Type', 'application/json; charset=utf-8').append('Authorization', 'lucca application=df45695d-14f6-4274-8d4a-27601f3ee64a'); // get apiKeyUUID 

  constructor(private httpClient: HttpClient) {

  }
  // get List Leave reauest from Lucca
  getListLeaves(ownerId: Number, date: String, paging: Number): Observable<any> {
    return this.httpClient.get("http://localhost:8080/LuccaLeaves/"+ownerId+"&"+date+"&"+paging);
  }

  getMidDayLeave(url: string): Observable<any> {
    return this.httpClient.get(url);
  }


  // how to pass the headers?
  //example on get with parameteres
  getCommentsByParameter(): Observable<any> {
    let params1 = new HttpParams().set('userId', "1");
    return this.httpClient.get("https://jsonplaceholder.typicode.com/comments?postId=1", { params: params1 })
  }

  postCommentsByParameter(opts: any): Observable<any> {
    return this.httpClient.post("https://jsonplaceholder.typicode.com/posts", opts, { headers: this.headers })
  }
}
