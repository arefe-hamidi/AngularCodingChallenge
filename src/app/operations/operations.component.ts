import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  errorStatus: boolean = false;
  errorMassege: string = '';
  result: any;
  ngOnInit() {
    this.readAddData();
    this.readMultiplyData();
    this.readNumbersData();
  }
  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}
  readNumbersData() {
    this.http.get(this.numberUrl).subscribe(
      (res) => {
        this.numbersData = res;
        this.computResult();
      },
      (error) => {
        this.errorMassege = 'Server Error';
        this.showSnackbarDuration();
        this.errorStatus = true;
      }
    );
  }
  readAddData() {
    this.http.get(this.addUrl).subscribe(
      (res) => {
        this.addData = res;
        if (!this.addData.value) {
          this.errorStatus = true;
          this.errorMassege = 'MISSING DATA';
          this.showSnackbarDuration();
        }
      },
      (error) => {
        this.errorStatus = true;
        this.errorMassege = 'MISSING DATA';
        this.showSnackbarDuration();
      }
    );
  }
  readMultiplyData() {
    this.http.get(this.multiplyUrl).subscribe(
      (res) => {
        this.multiplyData = res;
        if (!this.multiplyData.value) {
          this.errorStatus = true;
          this.errorMassege = 'MISSING DATA';
          this.showSnackbarDuration();
        }
      },
      (error) => {
        this.errorStatus = true;
        this.errorMassege = 'MISSING DATA';
        this.showSnackbarDuration();
      }
    );
  }
  showSnackbarDuration() {
    this.snackBar.open(this.errorMassege, 'Done');
  }
  computResult() {
    this.result = [];
    this.numbersData.forEach((element: any) => {
      if (element.action === 'add') {
        this.result.push({
          ...element,
          result: element.value + this.addData.value,
        });
      } else {
        this.result.push({
          ...element,
          result: element.value * this.multiplyData.value,
        });
      }
    });
  }
}
