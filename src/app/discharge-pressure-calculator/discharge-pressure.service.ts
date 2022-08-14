import { Injectable } from '@angular/core';
import {HoseLay} from "./types";

@Injectable({
  providedIn: 'root'
})
export class DischargePressureService {
  // source: https://frictionlosscalculator.com/formula
  readonly frictionLossCoefficients: { [key: number]: number } = {
    0.75: 1100,
    1: 150,
    1.25: 80,
    1.5: 24,
    1.75: 15.5,
    2: 8,
    2.5: 2,
    3: 0.677,
    3.5: 0.34,
    4: 0.2,
    4.5: 0.1,
    5: 0.08,
    6: 0.05
  }

  constructor() { }

  getFrictionLoss(hoseDiameter: number, hoseLength: number, gpm: number): number {
    const coefficient = this.frictionLossCoefficients[hoseDiameter];
    return coefficient * (gpm / 100)**2 * hoseLength / 100;
  }

  getDischargePressure(
    nozzlePressure: number,
    elevationChange: number,
    frictionLoss: number,
    applianceFrictionLoss: number = 0
  ): number {
    const head = elevationChange / 2;
    return nozzlePressure + head + frictionLoss + applianceFrictionLoss;
  }

  getDischargePressureForHoseLay(hoseLay: HoseLay): number {
    const frictionLoss = this.getFrictionLoss(hoseLay.diameter, hoseLay.length, hoseLay.gpm);
    return this.getDischargePressure(hoseLay.nozzlePressure, hoseLay.elevationChange ?? 0, frictionLoss);
  }

  getDischargePressureForHoseLays(hoseLays: HoseLay[]): number {
    if (hoseLays.length == 0) {
      return 0;
    }
    return Math.max(...hoseLays.map(hoseLay => this.getDischargePressureForHoseLay(hoseLay)));
  }
}
