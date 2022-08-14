import {Component, Input, OnInit} from '@angular/core';
import {HoseLay} from "../types";
import {DischargePressureService} from "../discharge-pressure.service";

@Component({
  selector: 'app-calculator-output',
  templateUrl: './calculator-output.component.html',
  styleUrls: ['./calculator-output.component.scss']
})
export class CalculatorOutputComponent implements OnInit {
  @Input() selectedHoseLays: HoseLay[] = [];

  constructor(private dischargePressureService: DischargePressureService) { }

  ngOnInit(): void {
  }

  get dischargePressure(): number {
    return this.dischargePressureService.getDischargePressureForHoseLays(this.selectedHoseLays);
  }

}
