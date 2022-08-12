import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {combineLatest, map, Observable, of} from "rxjs";
import {DischargePressureService} from "./discharge-pressure.service";
import {HoseLay} from "./types";
import {STANDARD_HOSE_LAYS} from "./standard-hose-lays";
import {StandardHoseLayInputValue} from "./standard-hose-lay-input/standard-hose-lay-input.component";

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
  readonly selectedHoseLays$: Observable<HoseLay[]> = this.form.controls.customHoseLays.valueChanges.pipe(
      map(customHoseLayInputValues => {
        return customHoseLayInputValues.filter(val => val?.enabled).map(val => val!.hoseLay);
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
      this.form.controls.customHoseLays.push(
          new FormControl(hoseLayValue)
       );
    });
    this.selectedHoseLays$.subscribe(selectedHoseLays => {
      console.log('selected hose lays: ', selectedHoseLays);
    })
  }

}
