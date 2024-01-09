import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { HomeComponent } from './home/home.component';
import { StoreModule } from '@ngrx/store';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { select } from '@ngrx/store';
import { of } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let store: MockStore;
  let modalService: NgbModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [
        StoreModule.forRoot({}), // You may need to provide your actual store configuration
        ReactiveFormsModule,
        NgbModule,
        HttpClientModule,
        RouterTestingModule,
      ],
      providers: [provideMockStore()],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    modalService = TestBed.inject(NgbModal);

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open delete modal', () => {
    const id = 1;
    spyOn(modalService, 'open').and.returnValue({
      componentInstance: {},
      result: Promise.resolve(),
    } as any);

    component.openDeleteModal(id);

    expect(modalService.open).toHaveBeenCalledOnceWith(component.deleteModal, { centered: true });
    expect(component.idToDelete).toBe(id);
  });

  it('should delete employee', fakeAsync(() => {
    const id = 1;
    spyOn(store, 'dispatch');
    spyOn(modalService, 'open').and.returnValue({
      componentInstance: {},
      result: Promise.resolve(),
    } as any);

    component.openDeleteModal(id);
    component.delete();

    // expect(store.dispatch).toHaveBeenCalledOnceWith({
    //   /* your delete action here with the correct payload */
    // });
    
    tick(); // simulate the passage of time until all pending promises resolve
    expect(modalService.open).toHaveBeenCalledOnceWith(component.deleteModal, { centered: true });
  }));
});
