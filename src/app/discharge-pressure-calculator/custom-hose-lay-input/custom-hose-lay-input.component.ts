import { Component, OnInit } from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormControl, NG_VALUE_ACCESSOR, Validators} from "@angular/forms";
import {StandardHoseLayInputValue} from "../standard-hose-lay-input/standard-hose-lay-input.component";
import {DischargePressureService} from "../discharge-pressure.service";
import {HoseLay} from "../types";

@Component({
  selector: 'app-custom-hose-lay-input',
  templateUrl: './custom-hose-lay-input.component.html',
  styleUrls: ['./custom-hose-lay-input.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: CustomHoseLayInputComponent,
    multi: true
  }]
})
export class CustomHoseLayInputComponent implements OnInit, ControlValueAccessor {
  readonly form = this.fb.nonNullable.group({
    enabled: new FormControl(false),
    hoseDiameter: [1, Validators.required],
    hoseLength: [0, Validators.required],
    nozzlePressure: [0, Validators.required],
    gpm: [0, Validators.required],
    elevationChange: [0, Validators.required],
    name: [""]
  })
  readonly hoseDiameters = Object.keys(this.dischargePressureService.frictionLossCoefficients).map(
      c => Number(c)
  ).sort();
  onChange = (hoseLay: StandardHoseLayInputValue) => {};
  onTouched = () => {};

  constructor(private fb: FormBuilder, private dischargePressureService: DischargePressureService) { }

  ngOnInit(): void {
    this.form.valueChanges.subscribe(change => {
      const hoseLay: HoseLay = {
        diameter: change.hoseDiameter ?? 1,
        gpm: change.gpm ?? 0,
        length: change.hoseLength ?? 0,
        name: change.name ?? "",
        nozzlePressure: change.nozzlePressure ?? 0
      }
      this.onChange({
        enabled: change.enabled ?? false,
        hoseLay: hoseLay
      });
      this.onTouched();
    })
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(obj: StandardHoseLayInputValue): void {
    this.form.setValue({
      enabled: obj.enabled,
      hoseDiameter: obj.hoseLay.diameter,
      hoseLength: obj.hoseLay.length,
      nozzlePressure: obj.hoseLay.nozzlePressure,
      gpm: obj.hoseLay.gpm,
      elevationChange: obj.hoseLay.elevationChange ?? 0,
      name: obj.hoseLay.name
    })
  }
}
