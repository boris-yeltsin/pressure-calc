import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {HoseLay} from "../types";
import {ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR} from "@angular/forms";
import {BehaviorSubject} from "rxjs";
import {DischargePressureService} from "../discharge-pressure.service";

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
  val!: StandardHoseLayInputValue;
  readonly frictionLoss$: BehaviorSubject<number> = new BehaviorSubject(0);

  readonly form: FormGroup = new FormGroup({
    enabled: new FormControl(false),
    gpm: new FormControl(1),
  });

  // Unclear why the following doesn't work. Does not emit anything on the very first
  // value change, leaving the displayed friction loss in the template blank. Workaround
  // is to subscribe to valueChanges and push calculated friction loss to a BehaviorSubject.
  // readonly frictionLoss$: Observable<number> = this.form.valueChanges.pipe(
  //     map(values => this.dischargePressureService.getFrictionLoss(
  //         this.val.hoseLay.diameter,
  //         this.val.hoseLay.length,
  //         values.gpm!
  //     ))
  // );

  onChange = (hoseLay: StandardHoseLayInputValue) => {};
  onTouched = () => {};

  constructor(private dischargePressureService: DischargePressureService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.form.valueChanges.subscribe(change => {
      this.val.enabled = change.enabled;
      this.val.hoseLay.gpm = change.gpm;
      this.onChange(this.val);
      this.onTouched();
      this.frictionLoss$.next(this.dischargePressureService.getFrictionLoss(
          this.val.hoseLay.diameter,
          this.val.hoseLay.length,
          this.val.hoseLay.gpm
      ));
    });
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(obj: StandardHoseLayInputValue): void {
    this.val = obj;
    this.form.setValue({
      enabled: obj.enabled,
      gpm: obj.hoseLay.gpm
    });
  }
}
