import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  DischargePressureCalculatorComponent
} from "./discharge-pressure-calculator/discharge-pressure-calculator.component";

const routes: Routes = [
  { path: '', component: DischargePressureCalculatorComponent }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
