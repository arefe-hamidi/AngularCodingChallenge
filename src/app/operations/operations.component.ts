import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BasicSnackbarComponent } from '../basic-snackbar/basic-snackbar.component';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.css'],
})
export class OperationsComponent implements OnInit {
  numbersData: any;
  numberUrl: string = '/assets/json/number.json';
  addData: any;
  addUrl: string = '/assets/json/add.json';
  multiplyData: any;
  multiplyUrl: string = '/assets/json/multiply.json';
  serverErrorStatus: boolean = false;
  missingDataErrorStatus: boolean = false;
  content: string = '';
  ngOnInit() {
    this.readNumbersData();
    this.readAddData();
    this.readMultiplyData();
  }
  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}
  readNumbersData() {
    this.http.get(this.numberUrl).subscribe(
      (res) => {
        this.numbersData = res;
      },
      (error) => {
        this.content = 'Server Error';
        this.showSnackbarDuration();
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
        // this._snackBar.open('MISSING DATA', 'Cancel');
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
  showSnackbarDuration() {
    this.snackBar.open(this.content, 'Done');
  }
}
