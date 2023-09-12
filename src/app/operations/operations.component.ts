import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.css'],
})
export class OperationsComponent implements OnInit {
  numbersData: any;
  numberUrl: string = '/assets/json/numbers.json';
  addData: any;
  addUrl: string = '/assets/json/add.json';
  multiplyData: any;
  multiplyUrl: string = '/assets/json/multiply.json';
  serverErrorStatus: boolean = false;
  missingDataErrorStatus: boolean = false;
  constructor(private http: HttpClient) {}
  ngOnInit() {
    this.readNumbersData();
    this.readAddData();
    this.readMultiplyData();
  }
  readNumbersData() {
    this.http.get(this.numberUrl).subscribe(
      (res) => {
        this.numbersData = res;
      },
      (error) => {
        this.serverErrorStatus = true;
        console.log('Server Error');
      }
    );
  }
  readAddData() {
    this.http.get(this.addUrl).subscribe(
      (res) => {
        this.addData = res;
        if (!this.addData.value) {
          this.missingDataErrorStatus = true;
        }
      },
      (error) => {
        this.missingDataErrorStatus = true;
        console.log('MISSING DATA');
      }
    );
  }
  readMultiplyData() {
    this.http.get(this.multiplyUrl).subscribe(
      (res) => {
        this.multiplyData = res;
        if (!this.multiplyData.value) {
          this.missingDataErrorStatus = true;
        }
      },
      (error) => {
        this.missingDataErrorStatus = true;
        console.log('MISSING DATA');
      }
    );
  }
}
