import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Employee } from './employee';

export const selectEmployee = createFeatureSelector<Employee[]>('myemployee');

export const selectEmployeeById = (EmployeeId: number) =>
  createSelector(selectEmployee, (employee: Employee[]) => {
    var EmployeebyId = employee.filter((_) => _.id == EmployeeId);
    if (EmployeebyId.length == 0) {
      return null;
    }
    return EmployeebyId[0];
  });
