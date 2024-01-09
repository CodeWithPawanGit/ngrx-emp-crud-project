import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { HomeComponent } from './home/home.component';
import { StoreModule } from '@ngrx/store';
import { EmployeeReducer } from './store/employee.reducer';
import { EffectsModule } from '@ngrx/effects';
import { EmployeeEffect } from './store/employee.effect';
import { AddComponent } from './add/add.component';
import { FormsModule } from '@angular/forms';
import { EditComponent } from './edit/edit.component';

@NgModule({
  declarations: [HomeComponent, AddComponent, EditComponent],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    FormsModule,
    StoreModule.forFeature('myemployee', EmployeeReducer),
    EffectsModule.forFeature([EmployeeEffect])
  ],
})
export class EmployeeModule {}
