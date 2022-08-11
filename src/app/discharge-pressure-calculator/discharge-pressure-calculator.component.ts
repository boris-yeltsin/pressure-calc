import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {combineLatest, map, Observable} from "rxjs";
import {DischargePressureService} from "./discharge-pressure.service";

@Component({
  selector: 'app-discharge-pressure-calculator',
  templateUrl: './discharge-pressure-calculator.component.html',
  styleUrls: ['./discharge-pressure-calculator.component.scss']
})
export class DischargePressureCalculatorComponent implements OnInit {
  readonly form: FormGroup = new FormGroup({
    hoseDiameter: new FormControl(1),
    hoseLength: new FormControl(0),
    nozzlePressure: new FormControl(0),
    gpm: new FormControl(0),
    elevationChange: new FormControl(0),
  });
  readonly frictionLoss$: Observable<number> = this.form.valueChanges.pipe(
    map(values => this.dischargePressureService.getFrictionLoss(
      values.hoseDiameter,
      values.hoseLength,
      values.gpm
    ))
  );
  readonly dischargePressure$: Observable<number> = combineLatest(this.form.valueChanges, this.frictionLoss$).pipe(
    map(([formValues, frictionLoss]) => this.dischargePressureService.getDischargePressure(
      formValues.nozzlePressure,
      formValues.elevationChange,
      frictionLoss
    ))
  );
  readonly hoseDiameters = Object.keys(this.dischargePressureService.frictionLossCoefficients).map(
    c => Number(c)
  ).sort();

  constructor(private dischargePressureService: DischargePressureService) { }

  ngOnInit(): void {
  }

}
