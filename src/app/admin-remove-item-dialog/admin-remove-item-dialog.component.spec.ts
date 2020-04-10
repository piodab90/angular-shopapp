import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRemoveItemDialogComponent } from './admin-remove-item-dialog.component';

describe('AdminRemoveItemDialogComponent', () => {
  let component: AdminRemoveItemDialogComponent;
  let fixture: ComponentFixture<AdminRemoveItemDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminRemoveItemDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRemoveItemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
