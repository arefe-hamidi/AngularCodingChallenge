import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'AngularCodingChallenge';
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
