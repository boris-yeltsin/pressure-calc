import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {combineLatest, map, merge, Observable, of, startWith} from "rxjs";
import {DischargePressureService} from "./discharge-pressure.service";
import {HoseLay} from "./types";
import {STANDARD_HOSE_LAYS} from "./standard-hose-lays";
import {
  StandardHoseLayInputComponent,
  StandardHoseLayInputValue
} from "./standard-hose-lay-input/standard-hose-lay-input.component";

@Component({
  selector: 'app-discharge-pressure-calculator',
  templateUrl: './discharge-pressure-calculator.component.html',
  styleUrls: ['./discharge-pressure-calculator.component.scss']
})
export class DischargePressureCalculatorComponent implements OnInit {
  readonly form = this.fb.nonNullable.group({
    hoseDiameter: [1, Validators.required],
    hoseLength: [0, Validators.required],
    nozzlePressure: [0, Validators.required],
    gpm: [0, Validators.required],
    elevationChange: [0, Validators.required],
    standardHoseLays: this.fb.array<StandardHoseLayInputValue>([]),
    customHoseLays: this.fb.array<StandardHoseLayInputValue>([])
  })
  readonly frictionLoss$: Observable<number> = this.form.valueChanges.pipe(
    map(values => this.dischargePressureService.getFrictionLoss(
      values.hoseDiameter!,
      values.hoseLength!,
      values.gpm!
    ))
  );
  readonly dischargePressure$: Observable<number> = combineLatest(this.form.valueChanges, this.frictionLoss$).pipe(
    map(([formValues, frictionLoss]) => this.dischargePressureService.getDischargePressure(
      formValues.nozzlePressure!,
      formValues.elevationChange!,
      frictionLoss
    ))
  );
  readonly hoseDiameters = Object.keys(this.dischargePressureService.frictionLossCoefficients).map(
    c => Number(c)
  ).sort();
  readonly EMPTY_HOSE_LAY: HoseLay = {
    diameter: 1, elevationChange: 0, gpm: 0, length: 0, nozzlePressure: 0, name: ""
  }
  readonly selectedHoseLays$: Observable<HoseLay[]> = combineLatest([
      this.form.controls.standardHoseLays.valueChanges.pipe(startWith([])),
      this.form.controls.customHoseLays.valueChanges.pipe(startWith([]))
  ]).pipe(
      map(([standardHoseLays, customHoseLays]) => {
        const hoseLayInputValues = (standardHoseLays as StandardHoseLayInputValue[])
            .concat((customHoseLays as StandardHoseLayInputValue[]));
        return hoseLayInputValues.filter(val => val?.enabled).map(val => val!.hoseLay);
      })
  );

  constructor(
      private dischargePressureService: DischargePressureService,
      private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    STANDARD_HOSE_LAYS.forEach(hoseLay => {
      const hoseLayValue: StandardHoseLayInputValue = {
        enabled: false,
        hoseLay: hoseLay
      }
      this.form.controls.standardHoseLays.push(
          new FormControl(hoseLayValue)
      );
    });
    [1,2,3].forEach(dischargeNum => {
      const hoseLay = Object.assign({}, this.EMPTY_HOSE_LAY);
      hoseLay.name = "Discharge " + dischargeNum;
      const hoseLayValue: StandardHoseLayInputValue = {
        enabled: false,
        hoseLay: hoseLay
      }
      this.form.controls.customHoseLays.push(
          new FormControl(hoseLayValue)
      );
    });
    this.selectedHoseLays$.subscribe(selectedHoseLays => {
      console.log('selected hose lays: ', selectedHoseLays);
    })
  }
}
