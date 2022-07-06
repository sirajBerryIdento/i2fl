import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class SynchronizedService {

  constructor(private httpClient: HttpClient) {

  }
 synchronize(): Observable<any> {
  return this.httpClient.get("http://localhost:8080/synchronized/");
 }
}
