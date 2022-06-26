import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddRecordComponent } from './components/add-record/add-record.component';

@NgModule({
  declarations: [
    DashboardComponent,
    AddRecordComponent
  ],
  imports: [
    CommonModule
  ]
})
export class DashboardModule { }
