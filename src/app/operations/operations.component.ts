import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.css'],
})
export class OperationsComponent implements OnInit {
  numbersData: any;
  url: string = '/assets/json/numbers.json';
  constructor(private http: HttpClient) {}
  ngOnInit() {
    this.http.get(this.url).subscribe((res) => {
      this.numbersData = res;
      console.log(res);
    });
  }
}
