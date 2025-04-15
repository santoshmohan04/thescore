import { inject } from '@angular/core';
import { pipe, switchMap, tap } from 'rxjs';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { ApiService, Employee } from '../services/api.service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';

type EmployeeState = {
  employeeslist: Employee[];
  selectedEmployee: Employee | null;
  isLoading: boolean;
};

const initialState: EmployeeState = {
  employeeslist: [],
  selectedEmployee: null,
  isLoading: false,
};

export const EmployeeStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, apiservice = inject(ApiService)) => ({
    //Fetch Employee List
    fetchEmployeesList: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap(() => {
          return apiservice.getEmployees().pipe(
            tapResponse({
              next: (res) =>
                patchState(store, { employeeslist: res, isLoading: false }),
              error: (err) => {
                patchState(store, { isLoading: false });
                console.error(err);
              },
            })
          );
        })
      )
    ),

    //Fetch Employee By Id
    fetchEmployeeData: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((id) => {
          return apiservice.getEmployeeById(id).pipe(
            tapResponse({
              next: (res) =>
                patchState(store, { selectedEmployee: res, isLoading: false }),
              error: (err) => {
                patchState(store, { isLoading: false });
                console.error(err);
              },
            })
          );
        })
      )
    ),

    //Create new employee
    createEmployee: rxMethod<Partial<Employee>>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((data) => {
          return apiservice.createEmployee(data).pipe(
            tapResponse({
              next: (res) =>
                patchState(store, (state) => ({
                  employeeslist: [...state.employeeslist, res],
                  isLoading: false,
                })),
              error: (err) => {
                patchState(store, { isLoading: false });
                console.error(err);
              },
            })
          );
        })
      )
    ),

    //Update employee
    updateEmployee: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((id) => {
          return apiservice
            .updateEmployee(id, store.selectedEmployee() ?? {})
            .pipe(
              tapResponse({
                next: (res) =>
                  patchState(store, (state) => ({
                    employeeslist: state.employeeslist.map((emp) =>
                      emp.id === res.id ? res : emp
                    ),
                    isLoading: false,
                  })),
                error: (err) => {
                  patchState(store, { isLoading: false });
                  console.error(err);
                },
              })
            );
        })
      )
    ),

    //Delete employee
    deleteEmployee: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((id) => {
          return apiservice.deleteEmployee(id).pipe(
            tapResponse({
              next: (res) =>
                patchState(store, (state) => ({
                  employeeslist: state.employeeslist.filter(
                    (emp) => emp.id !== res.id
                  ),
                  isLoading: false,
                })),
              error: (err) => {
                patchState(store, { isLoading: false });
                console.error(err);
              },
            })
          );
        })
      )
    ),
  }))
);
