import { Component, OnInit } from '@angular/core';
import { SynchronizedService } from 'src/app/_services/synchronized.service';

@Component({
  selector: 'app-synchronized',
  templateUrl: './synchronized.component.html',
  styleUrls: ['./synchronized.component.css']
})
export class SynchronizedComponent implements OnInit {

  constructor(private synchronizedService:SynchronizedService) { }

  ngOnInit(): void {
    this.synchronizedService.synchronize().subscribe(res=>{
      console.log("subscribe to changes in synchronize method")
    });
  }

}
