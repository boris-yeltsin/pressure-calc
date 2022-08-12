import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DischargePressureCalculatorComponent } from './discharge-pressure-calculator.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import { CustomHoseLayInputComponent } from './custom-hose-lay-input/custom-hose-lay-input.component';
import { StandardHoseLayInputComponent } from './standard-hose-lay-input/standard-hose-lay-input.component';
import {MatCardModule} from "@angular/material/card";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {FlexLayoutModule} from "@angular/flex-layout";

@NgModule({
  declarations: [
    DischargePressureCalculatorComponent,
    StandardHoseLayInputComponent,
    CustomHoseLayInputComponent
  ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatCardModule,
        MatCheckboxModule,
        FlexLayoutModule
    ]
})
export class DischargePressureCalculatorModule {}
