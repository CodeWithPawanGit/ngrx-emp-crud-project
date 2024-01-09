import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { EMPTY, map, mergeMap, switchMap, withLatestFrom } from 'rxjs';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { Appstate } from 'src/app/shared/store/appstate';
import { EmployeeService } from '../employee.service';
import {
  employeeFetchAPISuccess,
  deleteEmployeeAPISuccess,
  invokeEmployeeAPI,
  invokeDeleteEmployeeAPI,
  invokeSaveNewEmployeeAPI,
  invokeUpdateEmployeeAPI,
  saveNewEmployeeAPISucess,
  updateEmployeeAPISucess,
} from './employee.action';
import { selectEmployee } from './employee.selector';

@Injectable()
export class EmployeeEffect {
  constructor(
    private actions$: Actions,
    private employeeService: EmployeeService,
    private store: Store,
    private appStore: Store<Appstate>
  ) {}

  loadAllEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invokeEmployeeAPI),
      withLatestFrom(this.store.pipe(select(selectEmployee))),
      mergeMap(([, EmployeeformStore]) => {
        if (EmployeeformStore.length > 0) {
          return EMPTY;
        }
        return this.employeeService
          .get()
          .pipe(map((data) => employeeFetchAPISuccess({ allEmployee: data })));
      })
    )
  );

  saveNewEmployee$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(invokeSaveNewEmployeeAPI),
      switchMap((action) => {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this.employeeService.create(action.newEmployee).pipe(
          map((data) => {
            this.appStore.dispatch(
              setAPIStatus({
                apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
              })
            );
            return saveNewEmployeeAPISucess({ newEmployee: data });
          })
        );
      })
    );
  });

  updateEmployeeAPI$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(invokeUpdateEmployeeAPI),
      switchMap((action) => {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this.employeeService.update(action.updateEmployee).pipe(
          map((data) => {
            this.appStore.dispatch(
              setAPIStatus({
                apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
              })
            );
            return updateEmployeeAPISucess({ updateEmployee: data });
          })
        );
      })
    );
  });

  deleteEmployeeAPI$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(invokeDeleteEmployeeAPI),
      switchMap((actions) => {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this.employeeService.delete(actions.id).pipe(
          map(() => {
            this.appStore.dispatch(
              setAPIStatus({
                apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
              })
            );
            return deleteEmployeeAPISuccess({ id: actions.id });
          })
        );
      })
    );
  });
}
