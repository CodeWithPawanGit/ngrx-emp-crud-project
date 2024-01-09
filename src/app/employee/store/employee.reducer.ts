import { createReducer, on } from '@ngrx/store';
import { Employee } from './employee';
import { employeeFetchAPISuccess, deleteEmployeeAPISuccess, saveNewEmployeeAPISucess, updateEmployeeAPISucess } from './employee.action';

export const initialState: ReadonlyArray<Employee> = [];

export const EmployeeReducer = createReducer(
  initialState,
  on(employeeFetchAPISuccess, (state, { allEmployee }) => {
    return allEmployee;
  }),
  on(saveNewEmployeeAPISucess, (state, { newEmployee }) => {
    let newState = [...state];
    newState.unshift(newEmployee);
    return newState;
  }),
  on(updateEmployeeAPISucess, (state, { updateEmployee }) => {
    let newState = state.filter((_) => _.id != updateEmployee.id);
    newState.unshift(updateEmployee);
    return newState;
  }),
  on(deleteEmployeeAPISuccess, (state, { id }) => {
    let newState =state.filter((_) => _.id != id);
    return newState;
  })
);
