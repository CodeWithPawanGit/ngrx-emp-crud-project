import { createAction, props } from '@ngrx/store';
import { Employee } from './employee';

export const invokeEmployeeAPI = createAction(
  '[Employee API] Invoke Employee Fetch API'
);

export const employeeFetchAPISuccess = createAction(
  '[Employee API] Fetch API Success',
  props<{ allEmployee: Employee[] }>()
);

export const invokeSaveNewEmployeeAPI = createAction(
  '[Employee API] Inovke save new Employee api',
  props<{ newEmployee: Employee }>()
);

export const saveNewEmployeeAPISucess = createAction(
  '[Employee API] save new Employee api success',
  props<{ newEmployee: Employee }>()
);

export const invokeUpdateEmployeeAPI = createAction(
  '[Employee API] Inovke update Employee api',
  props<{ updateEmployee: Employee }>()
);

export const updateEmployeeAPISucess = createAction(
  '[Employee API] update  Employee api success',
  props<{ updateEmployee: Employee }>()
);

export const invokeDeleteEmployeeAPI = createAction(
  '[Employee API] Inovke delete Employee api',
  props<{id:number}>()
);

export const deleteEmployeeAPISuccess = createAction(
  '[Employee API] deleted Employee api success',
  props<{id:number}>()
);