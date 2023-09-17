import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestScheduler } from 'rxjs/testing';
import { getTestScheduler, cold } from 'jasmine-marbles';
import { OperationsComponent } from './operations.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { of, map } from 'rxjs';
describe('OperationsComponent', () => {
  let component: OperationsComponent;
  let fixture: ComponentFixture<OperationsComponent>;
  let numberData: any;
  let addTestData: any;
  let multiplyTestData: any;
  let mokNumberData;
  beforeEach(async(() => {
    numberData = [
      { value: 1, action: 'add' },
      { value: 2, action: 'multiply' },
      { value: 3, action: 'add' },
    ];
    addTestData = { value: 5 };
    multiplyTestData = { value: 10 };
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatSnackBarModule, MatCardModule],
      declarations: [OperationsComponent],
      providers: [OperationsComponent],
    }).compileComponents();
  }));

  it('get json files and return results', () => {
    fixture = TestBed.createComponent(OperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    getTestScheduler().flush();
    fixture.detectChanges();
    mokNumberData = jasmine.createSpyObj(['setNumberData']);
    mokNumberData.setNumberData.and.returnValue(of(true));
    component.numbersData = numberData;
    component.addData = addTestData;
    component.multiplyData = multiplyTestData;
    component.computResult();
    expect(component.numbersData.length).toBe(3);
    let scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
    scheduler.run(({ cold, expectObservable }) => {
      component.computResult();
      let finalTestResult = {
        a: numberData[0],
        b: numberData[1],
        c: numberData[2],
      };
      const source$ = cold('-a-b-c|', finalTestResult);
      let finalResult = {
        a: component.result[0].result,
        b: component.result[1].result,
        c: component.result[2].result,
      };

      const expected$ = cold('-a-b-c|', finalResult);
      const result$ = source$.pipe(
        map((v) =>
          v.action === 'add'
            ? v.value + addTestData.value
            : v.value * multiplyTestData.value
        )
      );
      expectObservable(result$).toEqual(expected$);
    });
  });
});
