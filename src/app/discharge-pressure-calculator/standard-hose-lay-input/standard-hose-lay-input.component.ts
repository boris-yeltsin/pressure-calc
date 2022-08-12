import {Component, OnInit} from '@angular/core';
import {HoseLay} from "../types";
import {ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR} from "@angular/forms";

export interface StandardHoseLayInputValue {
  enabled: boolean,
  hoseLay: HoseLay
}

@Component({
  selector: 'app-standard-hose-lay-input',
  templateUrl: './standard-hose-lay-input.component.html',
  styleUrls: ['./standard-hose-lay-input.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: StandardHoseLayInputComponent,
    multi: true
  }]
})
export class StandardHoseLayInputComponent implements OnInit, ControlValueAccessor {
  hoseLay!: HoseLay;

  readonly form: FormGroup = new FormGroup({
    enabled: new FormControl(false),
    gpm: new FormControl(1),
  });
  onChange = (hoseLay: StandardHoseLayInputValue) => {};
  onTouched = () => {};

  constructor() { }

  ngOnInit(): void {
    this.form.valueChanges.subscribe(change => {
      const hoseLay = Object.assign({}, this.hoseLay);
      hoseLay.gpm = change.gpm;
      this.onChange({
        enabled: change.enabled,
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
    this.hoseLay = obj.hoseLay;
    this.form.setValue({
      enabled: obj.enabled,
      gpm: obj.hoseLay.gpm
    })
  }
}
