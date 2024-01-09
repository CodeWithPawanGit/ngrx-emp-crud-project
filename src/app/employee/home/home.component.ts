import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { Appstate } from 'src/app/shared/store/appstate';
import {
  invokeEmployeeAPI,
  invokeDeleteEmployeeAPI,
} from '../store/employee.action';
import { selectEmployee } from '../store/employee.selector';
import { Employee } from '../store/employee';
import { invokeUpdateEmployeeAPI } from '../store/employee.action';

import { EmployeeService } from '../employee.service';

declare var window: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private employeeService: EmployeeService,
    private store: Store,

    private appStore: Store<Appstate>
  ) {}

  employee$ = this.store.pipe(select(selectEmployee));

  deleteModal: any;
  editModal: any;
  idToDelete: number = 0;

  EmployeeForm: Employee = {
    id: 0,
    empId: 0,
    empName: '',
    empPhoneNumber: 0,
    empEmail: '',
  };

  ngOnInit(): void {
    this.deleteModal = new window.bootstrap.Modal(
      document.getElementById('deleteModal')
    );
    this.editModal = new window.bootstrap.Modal(
      document.getElementById('editModal')
    );

    this.store.dispatch(invokeEmployeeAPI());
  }

  openDeleteModal(id: number) {
    this.idToDelete = id;
    this.deleteModal.show();
  }

  delete() {
    this.store.dispatch(
      invokeDeleteEmployeeAPI({
        id: this.idToDelete,
      })
    );
    let apiStatus$ = this.appStore.pipe(select(selectAppState));
    apiStatus$.subscribe((apState) => {
      if (apState.apiStatus == 'success') {
        this.deleteModal.hide();
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
      }
    });
  }

  openEditModal(employeeId: number): void {
    // Assuming you have a service method to fetch employee data by ID
    this.employeeService.getById(employeeId).subscribe((data) => {
      if (data) {
        // Assign the fetched data to EmployeeForm
        this.EmployeeForm = { ...data };

        // Trigger the Bootstrap modal
        // const editModal = new window.bootstrap.Modal(
        //   document.getElementById('editModal')
        // );
        this.editModal.show();
      } else {
        console.error(`Employee with id ${employeeId} not found.`);
      }
    });
  }

  saveChanges() {
    this.store.dispatch(
      invokeUpdateEmployeeAPI({ updateEmployee: { ...this.EmployeeForm } })
    );
    let apiStatus$ = this.appStore.pipe(select(selectAppState));
    apiStatus$.subscribe((apState) => {
      if (apState.apiStatus == 'success') {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
      }
    });
    this.editModal.hide();
  }
}
