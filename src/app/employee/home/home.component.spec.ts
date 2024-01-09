import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { Store, StoreModule } from '@ngrx/store';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeService } from '../employee.service';
import { invokeEmployeeAPI, invokeDeleteEmployeeAPI, invokeUpdateEmployeeAPI } from '../store/employee.action';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { Appstate } from 'src/app/shared/store/appstate';
import { of } from 'rxjs';
import { selectEmployee } from '../store/employee.selector';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let store: Store<Appstate>;
  let employeeService: EmployeeService;
  let modalService: NgbModal;

 beforeEach(() => {
  TestBed.configureTestingModule({
    declarations: [HomeComponent],
    imports: [
      StoreModule.forRoot({
        // Add your actual reducers and initial state here
        // For example: employee: employeeReducer
      }),
    ],
    providers: [EmployeeService, NgbModal],
  });

  fixture = TestBed.createComponent(HomeComponent);
  component = fixture.componentInstance;
  store = TestBed.inject(Store);
  employeeService = TestBed.inject(EmployeeService);
  modalService = TestBed.inject(NgbModal);

  spyOn(store, 'dispatch').and.callThrough();
});

// ... rest of the test file ...


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should invoke employee API on initialization', () => {
    fixture.detectChanges();
    expect(store.dispatch).toHaveBeenCalledWith(invokeEmployeeAPI());
  });

  it('should open delete modal', fakeAsync(() => {
    component.openDeleteModal(1);
    tick();
    expect(component.idToDelete).toBe(1);
    // Add expectations for modalService usage
  }));

  it('should delete employee', fakeAsync(() => {
    spyOn(store, 'pipe').and.returnValue(of({ apiStatus: 'success' }));
    component.idToDelete = 1;
    component.delete();
    tick();
    expect(store.dispatch).toHaveBeenCalledWith(
      invokeDeleteEmployeeAPI({ id: component.idToDelete })
    );
    // Add expectations for hiding modal and updating API status
  }));

  it('should open edit modal', fakeAsync(() => {
    spyOn(employeeService, 'getById').and.returnValue(of( {
      "id": 1,
      "empId": 116513133,
      "empName": "Prashant Malakoti",
      "empPhoneNumber": 123456789,
      "empEmail": "Prashant@example.com"
    }));
    component.openEditModal(1);
    tick();
    expect(component.EmployeeForm).toEqual( {
      "id": 1,
      "empId": 116513133,
      "empName": "Prashant Malakoti",
      "empPhoneNumber": 123456789,
      "empEmail": ""
    });
    // Add expectations for showing modal
  }));

  it('should save changes', fakeAsync(() => {
    spyOn(store, 'pipe').and.returnValue(of({ apiStatus: 'success' }));
    component.saveChanges();
    tick();
    expect(store.dispatch).toHaveBeenCalledWith(
      invokeUpdateEmployeeAPI({ updateEmployee: { ...component.EmployeeForm } })
    );
    // Add expectations for updating API status
  }));
});
